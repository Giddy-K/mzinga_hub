import { adminDB } from "../firebase-admin";

export async function deleteApiaryById(id: string) {
  await adminDB.ref(`apiaries/${id}`).remove(); // uses Admin SDK
}
