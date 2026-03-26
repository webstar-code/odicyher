/**
 * Parse a Supabase Storage "public object" URL into bucket + object path.
 * Shape: {SUPABASE_URL}/storage/v1/object/public/{bucket}/{path...}
 */
export function parseSupabasePublicObjectUrl(
  fileUrl: string,
  supabaseUrl: string,
): { bucket: string; objectPath: string } | null {
  let parsed: URL;
  try {
    parsed = new URL(fileUrl.trim());
  } catch {
    return null;
  }

  let base: URL;
  try {
    base = new URL(supabaseUrl.trim().replace(/\/$/, ""));
  } catch {
    return null;
  }

  if (parsed.origin !== base.origin) {
    return null;
  }

  const m = parsed.pathname.match(/^\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
  if (!m) {
    return null;
  }

  const bucket = m[1];
  let objectPath = m[2];
  try {
    objectPath = decodeURIComponent(objectPath);
  } catch {
    return null;
  }

  if (!bucket || !objectPath || objectPath.includes("..")) {
    return null;
  }

  return { bucket, objectPath };
}
