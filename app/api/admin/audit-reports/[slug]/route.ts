import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getAuditReportBySlugForAdmin } from "@/lib/audit-reports-repository";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { AuditReport, AuditReportStatus } from "@/types/audit-report";

function verifyAdminAuth(authHeader: string | null): boolean {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password =
    process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
  if (!password || !authHeader?.startsWith("Basic ")) return false;
  try {
    const base64 = authHeader.slice(6);
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":", 2);
    return user === username && pass === password;
  } catch {
    return false;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authHeader = _request.headers.get("Authorization");
  if (!verifyAdminAuth(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const record = await getAuditReportBySlugForAdmin(slug);

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authHeader = request.headers.get("Authorization");
  if (!verifyAdminAuth(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let body: {
    title?: string;
    status?: AuditReportStatus;
    content?: AuditReport;
    slug?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.title !== undefined) updates.title = body.title;
  if (body.status !== undefined) updates.status = body.status;
  if (body.content !== undefined) updates.content = body.content;
  if (body.slug !== undefined) {
    const normalized = body.slug.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (!normalized) {
      return NextResponse.json(
        { error: "Slug cannot be empty" },
        { status: 400 }
      );
    }
    updates.slug = normalized;
  }

  const { data, error } = await supabase
    .from("audit_reports")
    .update(updates)
    .eq("slug", slug)
    .select("id, slug, title, status, updated_at")
    .single();

  if (error) {
    console.error("[api/admin/audit-reports] Update failed:", error.message);
    return NextResponse.json(
      { error: error.message ?? "Update failed" },
      { status: 500 }
    );
  }

  revalidatePath("/admin/audit-reports");
  if (data?.slug) {
    revalidatePath(`/audit/${data.slug}`);
  }
  if (updates.slug && data?.slug) {
    revalidatePath(`/admin/audit-reports/${data.slug}`);
    revalidatePath(`/admin/audit-reports/${slug}`);
    revalidatePath("/");
  }

  return NextResponse.json(data);
}
