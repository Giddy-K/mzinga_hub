// /app/api/admin/content/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const docRef = await addDoc(collection(db, "content"), {
      ...body,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}
