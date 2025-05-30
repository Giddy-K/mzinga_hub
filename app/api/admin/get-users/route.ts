import { adminDB } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

interface RealtimeUser {
  name?: string;
  email?: string;
  role?: "admin" | "user";
  [key: string]: unknown;          // keep it loose for extra props
}

export async function GET() {
  try {
    // 1️⃣ build a reference with .ref()
    const snap = await adminDB.ref("users").get();

    if (!snap.exists()) {
      return NextResponse.json({ users: [] });
    }

    // 2️⃣ Re-shape the RTDB object into an array
    const raw = snap.val() as Record<string, RealtimeUser>;
    const users = Object.entries(raw).map(([id, data]) => ({
      id,
      ...data,
    }));

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return new NextResponse("Failed to fetch users", { status: 500 });
  }
}
