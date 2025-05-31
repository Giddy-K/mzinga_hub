// ✅ app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId:     process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
        name:     { label: "Name",     type: "text", optional: true },
      },
      async authorize(credentials) {
        const email    = credentials?.email    as string | undefined;
        const password = credentials?.password as string | undefined;
        const name     = credentials?.name     as string | undefined;
        if (!email || !password) return null;

        const userRef = doc(db, "users", email);
        const snap    = await getDoc(userRef);
        if (snap.exists()) {
          const stored = snap.data() as { password: string; name?: string };
          if (stored.password === password) {
            return { id: email, email, name: stored.name ?? email };
          }
          throw new Error("Invalid credentials");
        }
        // new user → create Firestore record
        await setDoc(userRef, {
          name:      name ?? email,
          email,
          password,        // ↪ hash in production
          role:      "user",
          createdAt: new Date(),
        });
        return { id: email, email, name: name ?? email };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const userRef = doc(db, "users", user.email);
      const snap    = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          name:      user.name,
          email:     user.email,
          role:      "user",
          createdAt: new Date(),
        });
      }
      user.id = user.email;
      return true;
    },

    async jwt({ token, user }) {
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

    async session({ session, token }) {
      if (session.user) {
        session.user.uid  = token.uid   as string | undefined;
        session.user.role = token.role  as "admin" | "user" | undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  debug: true, // enable to see config errors in logs
};

// In App-Router, you export NextAuth as named GET/POST handlers:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
