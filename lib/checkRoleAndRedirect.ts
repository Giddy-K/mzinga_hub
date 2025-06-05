import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useRouter } from "next/navigation";

export async function checkUserRoleAndRedirect(
  email: string,
  router: ReturnType<typeof useRouter>
) {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    console.log("🔍 Checking role for:", email);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      console.log("Firestore Role:", role);

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user") {
        router.push("/");
      } else {
        
        router.push("/unauthorized");
      }
    } else {
      console.warn("⚠️ No user doc found");
      console.log("No such user document!");
      router.push("/unauthorized");
    }

  } catch (error) {
    console.error("Error checking user role:", error);
    router.push("/unauthorized");
  }
}
