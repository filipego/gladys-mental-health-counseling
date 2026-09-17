import { NextResponse } from "next/server";

import { consultationSchema } from "@/lib/consultation-schema";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONSULTATION_TO_EMAIL) {
    return NextResponse.json({ kind: "not-configured", message: "Consultation delivery is not configured yet." }, { status: 503 });
  }

  return NextResponse.json({ kind: "not-configured", message: "Consultation delivery is not enabled yet." }, { status: 503 });
}
