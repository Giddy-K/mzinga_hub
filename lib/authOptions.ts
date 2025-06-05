import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { Session } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const name = credentials?.name as string | undefined;
        if (!email || !password) return null;

        const userRef = doc(db, "users", email);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const stored = snap.data() as { password: string; name?: string };
          if (stored.password === password) {
            return { id: email, email, name: stored.name ?? email };
          }
          throw new Error("Invalid credentials");
        }

        await setDoc(userRef, {
          name: name ?? email,
          email,
          password,
          role: "user",
          createdAt: new Date(),
        });

        return { id: email, email, name: name ?? email };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: User }) {
      const email = user.email!;
      const userRef = doc(db, "users", email);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          name: user.name,
          email,
          role: "user",
          createdAt: new Date(),
        });
      } else {
        user.role = snap.data()?.role ?? "user";
      }

      user.id = email;
      return true;
    },

    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user?.email) {
        const snap = await getDoc(doc(db, "users", user.email));
        if (snap.exists()) {
          token.role = snap.data()?.role ?? "user";
          token.uid = user.id;
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.uid = token.uid as string | undefined;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },

    redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/account/redirect`;
    },
  },

  pages: {
    signIn: "/login",
  },
};
