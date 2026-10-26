import test from "node:test";
import assert from "node:assert/strict";
import { render } from "@react-email/components";

import { ConsultationRequestEmail } from "./ConsultationRequestEmail";
import { ConsultationThankYouEmail } from "./ConsultationThankYouEmail";

test("thank-you email greets the requester and keeps the consultation disclaimer", async () => {
  const html = await render(<ConsultationThankYouEmail firstName="Alex" />);
  assert.match(html, /Dear <!-- -->Alex<!-- -->,|Dear Alex,/);
  assert.match(html, /does not schedule an\s+appointment or establish a therapist-client relationship/);
  assert.match(html, /Gladys Henriquez, MHC-LP/);
});

test("thank-you email escapes the submitted name", async () => {
  const html = await render(<ConsultationThankYouEmail firstName={'<script>alert("x")</script>'} />);
  assert.doesNotMatch(html, /<script>/);
});

test("request email lists only the answered fields with readable labels", async () => {
  const html = await render(
    <ConsultationRequestEmail
      data={{ firstName: "Alex", contactBy: "phone", email: "", phone: "212-555-0147", supportFor: "parent", meet: "", language: "spanish", availability: "", message: "", understand: true }}
    />,
  );
  assert.match(html, /Me as a parent/);
  assert.match(html, /Spanish/);
  assert.doesNotMatch(html, /Prefers to meet/);
});
