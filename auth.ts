// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const { auth, handlers, signIn, signOut } = NextAuth({
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
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const name = credentials?.name as string;

        if (!email || !password) return null;

        const ref = doc(db, "users", email);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const user = snap.data();
          if (user.password === password) {
            return { id: email, email, name: user.name };
          }
          throw new Error("Invalid credentials");
        }

        await setDoc(ref, {
          email,
          name,
          password,
          role: "user",
          createdAt: new Date(),
        });

        return { id: email, email, name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const snap = await getDoc(doc(db, "users", user.email));
        const role = snap.data()?.role ?? "user";
        token.role = role;
        token.uid = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as "admin" | "user";
      session.user.uid = token.uid as string;
      return session;
    },
  },
  pages: {
    signIn: "/account",
  },
});
