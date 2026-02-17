import admin from "firebase-admin";

function normalizePrivateKey(raw?: string) {
  if (!raw) throw new Error("Missing FIREBASE_PRIVATE_KEY in .env.local");
  // supports keys pasted with literal "\n"
  return raw.replace(/\\n/g, "\n");
}

export function getAdminDb() {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    if (!projectId || !clientEmail) {
      throw new Error(
        "Missing FIREBASE_PROJECT_ID or FIREBASE_CLIENT_EMAIL in .env.local"
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return admin.firestore();
}
