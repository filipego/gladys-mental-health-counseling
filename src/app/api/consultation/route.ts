import { createElement } from "react";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { Resend } from "resend";

import { ConsultationRequestEmail } from "@/emails/ConsultationRequestEmail";
import { ConsultationThankYouEmail } from "@/emails/ConsultationThankYouEmail";
import { consultationSchema } from "@/lib/consultation-schema";

const DEFAULT_FROM = "Gladys Henriquez <info@lovelydayscounseling.com>";
const DEFAULT_TO = "info@lovelydayscounseling.com";

/** Public site origin for email images: explicit override, else Vercel's production domain. */
function siteOrigin() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : undefined;
}

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ kind: "not-configured", message: "Consultation delivery is not configured yet." }, { status: 503 });
  }

  const data = parsed.data;
  const to = process.env.CONSULTATION_TO_EMAIL || DEFAULT_TO;
  const from = process.env.CONSULTATION_FROM_EMAIL || DEFAULT_FROM;
  const requesterEmail = data.email || undefined;
  const resend = new Resend(apiKey);

  // The request must reach the practice before the visitor is told it was received.
  const requestEmail = createElement(ConsultationRequestEmail, { data });
  const notification = await resend.emails.send({
    from,
    to,
    replyTo: requesterEmail,
    subject: `New consultation request from ${data.firstName}`,
    html: await render(requestEmail),
    text: await render(requestEmail, { plainText: true }),
  });
  if (notification.error) {
    console.error("Consultation notification failed", notification.error);
    return NextResponse.json({ kind: "delivery-failed", message: "Your request couldn't be sent." }, { status: 502 });
  }

  // The thank-you note is a courtesy; a failure here should not undo a delivered request.
  if (requesterEmail) {
    const origin = siteOrigin();
    const thankYouEmail = createElement(ConsultationThankYouEmail, {
      firstName: data.firstName,
      logoSrc: origin ? `${origin}/email/lovely-days-logo-white.png` : undefined,
    });
    const thankYou = await resend.emails.send({
      from,
      to: requesterEmail,
      subject: "Thank you for reaching out",
      html: await render(thankYouEmail),
      text: await render(thankYouEmail, { plainText: true }),
    });
    if (thankYou.error) console.error("Consultation thank-you email failed", thankYou.error);
  }

  return NextResponse.json({ kind: "sent" }, { status: 200 });
}
