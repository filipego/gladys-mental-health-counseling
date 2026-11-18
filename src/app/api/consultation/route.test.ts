import test from "node:test";
import assert from "node:assert/strict";

import { POST } from "./route";

type SentEmail = { from: string; to: string | string[]; subject: string; html: string; reply_to?: string | string[] };

/** Sends a form through the real handler, catching what would go to Resend. */
async function submit(lang: unknown) {
  const sent: SentEmail[] = [];
  const realFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = "re_test";
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    sent.push(JSON.parse(String(init?.body)));
    return new Response(JSON.stringify({ id: `email-${sent.length}` }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const response = await POST(
      new Request("https://example.com/api/consultation", {
        method: "POST",
        body: JSON.stringify({
          firstName: "Ana",
          contactBy: "email",
          email: "ana@example.com",
          phone: "",
          supportFor: "myself",
          meet: "",
          language: "",
          availability: "",
          message: "",
          understand: true,
          lang,
        }),
      }),
    );
    return { status: response.status, sent };
  } finally {
    globalThis.fetch = realFetch;
  }
}

test("a request from the English site goes to consultations@ and thanks the visitor in English", async () => {
  const { status, sent } = await submit("en-us");
  assert.equal(status, 200);
  assert.equal(sent.length, 2);
  const [notification, thankYou] = sent;
  assert.equal(notification.to, "consultations@lovelydayscounseling.com");
  assert.equal(notification.from, "Gladys Henriquez <consultations@lovelydayscounseling.com>");
  assert.equal(thankYou.to, "ana@example.com");
  assert.equal(thankYou.from, "Gladys Henriquez <consultations@lovelydayscounseling.com>");
  assert.equal(thankYou.subject, "Thank you for reaching out");
  assert.match(thankYou.html, /Thank you for reaching out and taking the first step/);
});

test("a request from the Spanish site goes to consultas@ and thanks the visitor in Spanish", async () => {
  const { status, sent } = await submit("es-us");
  assert.equal(status, 200);
  assert.equal(sent.length, 2);
  const [notification, thankYou] = sent;
  assert.equal(notification.to, "consultas@lovelydayscounseling.com");
  assert.equal(notification.from, "Gladys Henriquez <consultas@lovelydayscounseling.com>");
  assert.equal(thankYou.to, "ana@example.com");
  assert.equal(thankYou.from, "Gladys Henriquez <consultas@lovelydayscounseling.com>");
  assert.equal(thankYou.subject, "Gracias por comunicarse conmigo");
  assert.match(thankYou.html, /lang="es"/);
  assert.match(thankYou.html, /Gracias por comunicarse conmigo y por dar este primer paso/);
  assert.doesNotMatch(thankYou.html, /Thank you for reaching out/);
});

test("a request without a known language falls back to English and consultations@", async () => {
  const { sent } = await submit(undefined);
  assert.equal(sent[0].to, "consultations@lovelydayscounseling.com");
  assert.equal(sent[1].subject, "Thank you for reaching out");
});
