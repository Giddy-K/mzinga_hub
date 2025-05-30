import type { Apiary } from "@/types/apiary";
import { adminDB } from "@/lib/firebase-admin";

export async function getAllApiaries(): Promise<(Apiary & { id: string })[]> {
  const snapshot = await adminDB.ref("apiaries").get();  // bypasses rules

  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<string, Apiary>;

  return Object.entries(data).map(([id, value]) => ({ id, ...value }));
}
