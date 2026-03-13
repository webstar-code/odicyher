"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { defaultAuditReport } from "@/lib/default-audit-report";

const TABLE = "audit_reports";

async function getAdmin() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Admin Supabase client not configured");
  }
  return supabase;
}

export async function createAuditReport() {
  const supabase = await getAdmin();

  const slug = `audit-${Date.now()}`;
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      slug,
      title: "New Audit Report",
      status: "draft",
      content: defaultAuditReport,
    })
    .select("slug")
    .single();

  if (error) {
    console.error("[createAuditReport]", error);
    throw new Error("Failed to create report");
  }

  revalidatePath("/admin/audit-reports");
  redirect(`/admin/audit-reports/${data.slug}`);
}
