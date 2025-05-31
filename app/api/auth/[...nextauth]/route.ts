// import { handlers } from "@/auth" // Referring to the auth.ts we created
// export const { GET, POST } = handlers

// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * 1. Make authOptions a local constant (do NOT export it).
 * 2. We type it as NextAuthOptions so that all callback parameters
 *    (signIn, jwt, session) have proper types instead of `any`.
 */
const authOptions: NextAuthOptions = {
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

        // If user already exists, check password
        if (snap.exists()) {
          const stored = snap.data() as { password: string; name?: string };
          if (stored.password === password) {
            return { id: email, email, name: stored.name ?? email };
          }
          throw new Error("Invalid credentials");
        }

        // Otherwise, create a new Firestore record
        await setDoc(userRef, {
          name:      name ?? email,
          email,
          password,     // ⚠ In production you should hash this
          role:      "user",
          createdAt: new Date(),
        });
        return { id: email, email, name: name ?? email };
      },
    }),
  ],

  callbacks: {
    /**
     * `signIn` callback is now fully typed. `user` is known to be a NextAuth User.
     */
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
      // Add `id` field to NextAuth’s User object
      user.id = user.email;
      return true;
    },

    /**
     * `jwt` callback is fully typed: `token: JWT`, `user?: User`.
     */
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

    /**
     * `session` callback is fully typed: `session: Session`, `token: JWT`.
     */
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

  debug: true, // prints helpful debug logs if something goes wrong
};

/**
 * 3. Wrap `NextAuth(authOptions)` in named `GET`/`POST` functions.
 *    These are the only exports in this file—no `export const authOptions`.
 */
const handler = NextAuth(authOptions);

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
