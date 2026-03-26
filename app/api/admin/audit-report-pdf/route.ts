import { NextRequest, NextResponse } from "next/server";

import { verifyAdminBasicAuth } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MAX_BYTES = 20 * 1024 * 1024;

function folderSlug(raw: string | null): string {
  if (!raw) return "unassigned";
  const t = raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return t || "unassigned";
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!verifyAdminBasicAuth(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const reportSlugField = formData.get("reportSlug");
  const slugFolder = folderSlug(
    typeof reportSlugField === "string" ? reportSlugField : null
  );

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 20MB)" },
      { status: 400 }
    );
  }

  const mime = file.type || "application/octet-stream";
  const nameLower = file.name.toLowerCase();
  const isPdf =
    mime === "application/pdf" ||
    (mime === "application/octet-stream" && nameLower.endsWith(".pdf"));

  if (!isPdf) {
    return NextResponse.json(
      { error: "Only PDF files are allowed" },
      { status: 400 }
    );
  }

  const bucket =
    process.env.SUPABASE_BRAND_LOGOS_BUCKET?.trim() || "assets";
  const objectName = `${crypto.randomUUID()}.pdf`;
  const objectPath = `${slugFolder}/reports/${objectName}`;

  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(bucket).upload(objectPath, buf, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (error) {
    console.error("[api/admin/audit-report-pdf]", error.message);
    return NextResponse.json(
      { error: error.message ?? "Upload failed" },
      { status: 500 }
    );
  }

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(objectPath);

  return NextResponse.json({ url: publicData.publicUrl });
}
