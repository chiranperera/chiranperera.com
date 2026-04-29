import { NextResponse, type NextRequest } from "next/server";

/**
 * Gate every /admin route behind HTTP Basic auth using ADMIN_USER + ADMIN_PASSWORD.
 *
 * Single-user admin only. Phase 3+ can be upgraded to a magic-link flow
 * (Auth.js or a custom iron-session-based one) but for a one-person studio
 * Basic Auth over HTTPS is sufficient and adds zero dependencies.
 */
export function proxy(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const expectedUser = process.env.ADMIN_USER ?? "chiran";
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    return new NextResponse(
      "Admin is not configured. Set ADMIN_PASSWORD in your environment.",
      { status: 503 },
    );
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(":");
    if (sep !== -1) {
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="chiranperera.com admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
