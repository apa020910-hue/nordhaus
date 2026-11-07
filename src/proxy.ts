import { NextRequest, NextResponse } from "next/server";
function preferredLocale(header: string | null): "lv" | "ru" | "en" {
  const preferred = (header ?? "").split(",")[0]?.split(";")[0]?.trim().toLowerCase() ?? "";
  if (preferred.startsWith("ru")) return "ru";
  if (preferred.startsWith("en")) return "en";
  return "lv";
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${preferredLocale(request.headers.get("accept-language"))}`, request.url));
  }

  const requestedLocale = pathname.split("/")[1] ?? "";
  const locale = requestedLocale === "lv" || requestedLocale === "ru" || requestedLocale === "en" ? requestedLocale : "lv";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
