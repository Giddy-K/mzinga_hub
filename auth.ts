import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import type { User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

/* Auth configuration */
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,

  /* Providers */
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

      async authorize(
        credentials?: Partial<Record<"email" | "password" | "name", unknown>>,
      ): Promise<User | null> {
        /* runtime validation – keep it simple */
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const name = credentials?.name as string | undefined;

        if (!email || !password) return null;

        const userRef = doc(db, "users", email);
        const snap = await getDoc(userRef);

        /* Existing user → check password */
        if (snap.exists()) {
          const stored = snap.data() as { password: string; name?: string };
          if (stored.password === password) {
            return { id: email, email, name: stored.name ?? email };
          }
          throw new Error("Invalid credentials");
        }

        /* New user → create doc */
        await setDoc(userRef, {
          name: name ?? email,
          email,
          password,                // ⚠️  hash in production
          role: "user",
          createdAt: new Date(),
        });

        return { id: email, email, name: name ?? email };
      },
    }),
  ],

  /* Callbacks */
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      const email = user.email;
      if (!email) return false;

      const userRef = doc(db, "users", email);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          name: user.name,
          email,
          role: "user", // ✅ Default only if new user
          createdAt: new Date(),
        });
      } else {
        // Preserve existing role if already created manually
        const data = snap.data();
        user.role = data?.role ?? "user"; // Optional: to store in user obj
      }

      user.id = email;
      return true;
    },

    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.uid = user.id;

        if (user.email) {
          const snap = await getDoc(doc(db, "users", user.email));
          if (snap.exists()) {
            token.role = (snap.data() as { role?: "admin" | "user" }).role ?? "user";
          }
        }
      }
      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.uid = token.uid as string | undefined;
        session.user.role = token.role as "admin" | "user" | undefined;
      }
      return session;
    },

    // async redirect({ baseUrl, url }) {
    //   console.log("REDIRECT to:", url);
    //   return `${baseUrl}/account/redirect`;
    // },

  },

  pages: { signIn: "/login" },
});
