// lib/auth.ts (or just auth.ts at root)

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const { auth } = NextAuth(authOptions);
