// app/api/auth/[...nextauth]/route.ts

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import { handlers } from "@/auth";

// import type { User } from "next-auth";
// import type { Session } from "next-auth";
// import type { JWT } from "next-auth/jwt";


// ✅ Correctly wrapped request handlers
export const { GET, POST } = handlers;
