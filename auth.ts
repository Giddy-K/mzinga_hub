import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const { handlers, auth, signIn, signOut } = NextAuth({
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
        const { email, password, name } = credentials!;
        const userId = email; // Still using email as ID here; will use UID in session and Firestore if available

        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const user = userSnap.data();

          if (user.password === password) {
            return { id: userId, email, name: user.name || email };
          } else {
            throw new Error("Invalid credentials");
          }
        } else {
          await setDoc(userRef, {
            name: name || email,
            email,
            password, // ⚠️ Hash in production
            role: "user",
            createdAt: new Date(),
          });

          return { id: userId, email, name };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Use the UID provided by Google or fallback to email
        const uid = account?.provider === "google"
          ? account.providerAccountId
          : user.id;

        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            name: user.name,
            email: user.email,
            role: "user",
            createdAt: new Date(),
          });
        }

        // Store UID on the user object for the JWT callback
        user.id = uid;

        return true;
      } catch (err) {
        console.error("Error storing user in Firestore:", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.uid) {
        session.user.uid = token.uid;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
