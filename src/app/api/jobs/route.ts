import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import admin from "firebase-admin";

type CreateJobBody = {
  company: string;
  role: string;
  status: string;
  location?: string;
  applyUrl?: string;
};

function isNonEmptyString(v: unknown) {
  return typeof v === "string" && v.trim().length > 0;
}

export async function GET() {
  try {
    const db = getAdminDb();

    const snap = await db
      .collection("jobs")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const jobs = snap.docs.map((doc) => {
      const data = doc.data();

      const createdAt = data.createdAt?.toDate?.()?.toISOString?.() ?? null;
      const updatedAt = data.updatedAt?.toDate?.()?.toISOString?.() ?? null;

      return { id: doc.id, ...data, createdAt, updatedAt };
    });

    return NextResponse.json({ data: jobs }, { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create jobs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CreateJobBody>;

    if (
      !isNonEmptyString(body.company) ||
      !isNonEmptyString(body.role) ||
      !isNonEmptyString(body.status)
    ) {
      return NextResponse.json(
        { error: "Missing required fields: company, role, status" },
        { status: 400 }
      );
    }

    const db = getAdminDb();

    const now = admin.firestore.FieldValue.serverTimestamp();

    const docRef = await db.collection("jobs").add({
      company: (body.company as string).trim(),
      role: (body.role as string).trim(),
      status: (body.status as string).trim(),
      location: body.location?.trim() ?? "",
      applyUrl: body.applyUrl?.trim() ?? "",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create jobs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
