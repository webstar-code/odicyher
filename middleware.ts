import { NextResponse } from "next/server";

/**
 * Basic auth for /admin routes.
 *
 * Set ADMIN_USERNAME and ADMIN_PASSWORD in .env (or ADMIN_SECRET
 * to use "admin" as username with the secret as password).
 */
function checkBasicAuth(authHeader: string | null): boolean {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password =
    process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "";

  if (!password) {
    return false;
  }

  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  try {
    const base64 = authHeader.slice(6);
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":", 2);
    return user === username && pass === password;
  } catch {
    return false;
  }
}

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("Authorization");
  const isValid = checkBasicAuth(authHeader);

  if (!isValid) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
