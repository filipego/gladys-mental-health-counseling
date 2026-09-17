import test from "node:test";
import assert from "node:assert/strict";

import { consultationSchema } from "./consultation-schema";

const base = {
  firstName: "Alex",
  contactBy: "email" as const,
  email: "alex@example.com",
  phone: "",
  supportFor: "myself" as const,
  meet: "",
  language: "",
  availability: "",
  message: "",
  understand: true as const,
};

test("accepts a complete email consultation request", () => {
  assert.equal(consultationSchema.safeParse(base).success, true);
});

test("requires the selected contact method", () => {
  const result = consultationSchema.safeParse({ ...base, email: "", contactBy: "email" });
  assert.equal(result.success, false);
  if (!result.success) assert.equal(result.error.flatten().fieldErrors.email?.length, 1);
});

test("reports the selected email field even when other required fields are empty", () => {
  const result = consultationSchema.safeParse({
    firstName: "",
    contactBy: "email",
    email: "",
    phone: "",
    supportFor: undefined,
    understand: false,
  });

  assert.equal(result.success, false);
  if (!result.success) {
    const fields = result.error.flatten().fieldErrors;
    assert.equal(fields.email?.[0], "Enter a valid email address so I can contact you.");
    assert.equal(fields.phone, undefined);
  }
});

test("reports the selected phone field even when other required fields are empty", () => {
  const result = consultationSchema.safeParse({
    firstName: "",
    contactBy: "phone",
    email: "",
    phone: "",
    supportFor: undefined,
    understand: false,
  });

  assert.equal(result.success, false);
  if (!result.success) {
    const fields = result.error.flatten().fieldErrors;
    assert.equal(fields.phone?.[0], "Enter a phone number so I can contact you.");
    assert.equal(fields.email, undefined);
  }
});

test("requires consent", () => {
  const result = consultationSchema.safeParse({ ...base, understand: false });
  assert.equal(result.success, false);
});
