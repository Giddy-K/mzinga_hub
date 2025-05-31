// import { handlers } from "@/auth" // Referring to the auth.ts we created
// export const { GET, POST } = handlers

// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const authOptions: NextAuthOptions = {
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

        // If user does not exist, create them:
        await setDoc(userRef, {
          name:      name ?? email,
          email,
          password,     // ⚠ Make sure to hash in production!
          role:      "user",
          createdAt: new Date(),
        });
        return { id: email, email, name: name ?? email };
      },
    }),
  ],

  callbacks: {
    // `signIn` callback gets typed parameters
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

    // `jwt` callback gets typed parameters
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

    // `session` callback gets typed parameters
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

  debug: true,
};

const handler = NextAuth(authOptions);

// Wrap the NextAuth handler inside proper GET/POST route functions:
export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
