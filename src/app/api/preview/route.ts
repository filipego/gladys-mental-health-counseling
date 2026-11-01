import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";

import { languageCookie } from "@/lib/i18n";
import { createClient } from "../../../prismicio";

export async function GET(request: NextRequest) {
  const client = createClient();

  // English and Spanish share addresses, so show the previewed document in its own language
  const documentID = request.nextUrl.searchParams.get("documentId");
  const previewToken = request.nextUrl.searchParams.get("token");
  if (documentID && previewToken) {
    const document = await client
      .getByID(documentID, { ref: previewToken, lang: "*" })
      .catch(() => null);
    const choice = document?.lang === "es-us" ? "es" : document?.lang === "en-us" ? "en" : null;
    if (choice) {
      (await cookies()).set(languageCookie, choice, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
  }

  return await redirectToPreviewURL({ client, request });
}
