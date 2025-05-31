// import { handlers } from "@/auth" // Referring to the auth.ts we created
// export const { GET, POST } = handlers

// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * You may keep this `authOptions` object here if you need to reference
 * it elsewhere (e.g. in getServerSession). Just do NOT export it as a
 * Next.js route handler—only export GET/POST below.
 */
const authOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: true,

  providers: [
    GoogleProvider({
      clientId:     process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
        name:     { label: "Name",     type: "text", optional: true },
      },
      async authorize(credentials) {
        const email    = credentials?.email    as string | undefined;
        const password = credentials?.password as string | undefined;
        const name     = credentials?.name     as string | undefined;
        if (!email || !password) return null;

        // Look up the user in Firestore
        const userRef = doc(db, "users", email);
        const snap    = await getDoc(userRef);

        if (snap.exists()) {
          const stored = snap.data() as { password: string; name?: string };
          if (stored.password === password) {
            return { id: email, email, name: stored.name ?? email };
          }
          throw new Error("Invalid credentials");
        }

        // If user doesn't exist, create a new user document
        await setDoc(userRef, {
          name:      name ?? email,
          email,
          password,        // 👉 In production, you must hash this
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
        // First‐time Google sign‐in → add to Firestore
        await setDoc(userRef, {
          name:      user.name,
          email:     user.email,
          role:      "user",
          createdAt: new Date(),
        });
      }

      user.id = user.email; // store email as id on the JWT
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
        session.user.uid  = token.uid  as string | undefined;
        session.user.role = token.role as "admin" | "user" | undefined;
      }
      return session;
    },
  },
};

// Create a NextAuth handler, then export it under BOTH GET and POST.
// That is exactly what the App Router expects at runtime.
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
