import { admin } from "@/lib/firebase-admin";

export async function GET() {
  const snapshot = await admin.firestore().collection("users").get();
  const users = snapshot.docs.map((doc) => doc.data());

  return Response.json({ users });
}
