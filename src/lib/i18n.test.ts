import test from "node:test";
import assert from "node:assert/strict";

import { localeFromAcceptLanguage, localeFromChoice } from "./i18n";

test("a device set to Spanish gets the Spanish site", () => {
  assert.equal(localeFromAcceptLanguage("es-US,es;q=0.9,en;q=0.8"), "es-us");
  assert.equal(localeFromAcceptLanguage("es-MX"), "es-us");
  assert.equal(localeFromAcceptLanguage("fr-FR,es;q=0.8,en;q=0.5"), "es-us");
});

test("a device set to English, another language, or nothing gets the English site", () => {
  assert.equal(localeFromAcceptLanguage("en-US,en;q=0.9,es;q=0.8"), "en-us");
  assert.equal(localeFromAcceptLanguage("fr-FR,fr;q=0.9"), "en-us");
  assert.equal(localeFromAcceptLanguage(null), "en-us");
  assert.equal(localeFromAcceptLanguage("en;q=0.5,es;q=0.9"), "es-us");
});

test("the toggle choice is read from the cookie value", () => {
  assert.equal(localeFromChoice("es"), "es-us");
  assert.equal(localeFromChoice("en"), "en-us");
  assert.equal(localeFromChoice(undefined), null);
  assert.equal(localeFromChoice("de"), null);
});
