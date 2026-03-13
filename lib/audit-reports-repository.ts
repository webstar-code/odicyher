import { getSupabaseClient } from "@/lib/supabase-client";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { AuditReport, AuditReportRecord } from "@/types/audit-report";

const TABLE_NAME = "audit_reports";

function toRecord(data: {
  id: string;
  slug: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  content: AuditReport;
}): AuditReportRecord {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    status: data.status as AuditReportRecord["status"],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    content: data.content,
  };
}

/**
 * Fetch a single published audit report by its slug.
 *
 * This is a thin wrapper around Supabase for use in server components
 * or API routes. It assumes the `content` column matches `AuditReport`.
 */
export async function getPublishedAuditReportBySlug(
  slug: string,
): Promise<AuditReportRecord | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, slug, title, status, created_at, updated_at, content")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "[audit-reports-repository] Failed to load audit report:",
      error.message ?? JSON.stringify(error),
    );
    return null;
  }

  if (!data) {
    return null;
  }

  return toRecord(data);
}

/**
 * Fetch any audit report by slug (admin only, bypasses RLS).
 */
export async function getAuditReportBySlugForAdmin(
  slug: string,
): Promise<AuditReportRecord | null> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, slug, title, status, created_at, updated_at, content")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(
      "[audit-reports-repository] Admin fetch failed:",
      error.message ?? JSON.stringify(error),
    );
    return null;
  }

  if (!data) {
    return null;
  }

  return toRecord(data);
}

/**
 * Fetch all audit reports for admin list (any status).
 */
export async function getAuditReportsForAdmin(): Promise<AuditReportRecord[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, slug, title, status, created_at, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(
      "[audit-reports-repository] Admin list failed:",
      error.message ?? JSON.stringify(error),
      error,
    );
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status as AuditReportRecord["status"],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    content: {} as AuditReport, // Not loaded in list view
  }));
}

