// import admin from "firebase-admin";

// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
// );

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://mzingahub-68de6-default-rtdb.firebaseio.com"
//   });
// }

// export { admin };

// !Updated code
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// Only run once in the server environment
if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export const adminDB = getDatabase();
