import { headers } from "next/headers";

/**
 * Basic auth verification for admin routes.
 *
 * Middleware gates /admin, but we double-check here for server components.
 * Reads Authorization header and verifies against ADMIN_USERNAME + ADMIN_PASSWORD
 * (or ADMIN_SECRET used as password with username "admin").
 */
function verifyBasicAuth(authHeader: string | null): boolean {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password =
    process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "";

  if (!password || !authHeader?.startsWith("Basic ")) {
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

export async function requireAdmin(): Promise<boolean> {
  const headersList = await headers();
  const authHeader = headersList.get("Authorization");
  return verifyBasicAuth(authHeader);
}

