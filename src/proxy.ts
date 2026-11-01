import { NextResponse, type NextRequest } from "next/server";

import {
  languageCookie,
  localeFromAcceptLanguage,
  localeFromChoice,
  locales,
} from "@/lib/i18n";

/**
 * Serves every page in the visitor's language under the same address. The
 * language folder (/en-us, /es-us) is internal and never shows in the URL.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // A typed internal address goes back to the public one
  const internal = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (internal) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(internal.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  const locale =
    localeFromChoice(request.cookies.get(languageCookie)?.value) ??
    localeFromAcceptLanguage(request.headers.get("accept-language"));

  return NextResponse.rewrite(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url),
  );
}

export const config = {
  // Pages only: not API routes, Next.js internals, or files such as icons and images
  matcher: ["/((?!api/|_next/|_vercel/|.*\\.[\\w]+$).*)"],
};
