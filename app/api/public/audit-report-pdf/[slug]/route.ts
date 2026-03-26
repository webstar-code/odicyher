import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { parseSupabasePublicObjectUrl } from "@/lib/supabase-storage-path";
import type { AuditReport } from "@/types/audit-report";

const TABLE_NAME = "audit_reports";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug?.trim()) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  const { data: row, error: rowError } = await supabase
    .from(TABLE_NAME)
    .select("content")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (rowError) {
    console.error("[audit-report-pdf]", rowError.message);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }

  if (!row?.content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const content = row.content as AuditReport;
  const pdfUrl = content.fullReportPdfSrc?.trim();
  if (!pdfUrl) {
    return NextResponse.json({ error: "No PDF for this report" }, { status: 404 });
  }

  const parsed = parseSupabasePublicObjectUrl(pdfUrl, supabaseUrl);
  if (!parsed) {
    console.error(
      "[audit-report-pdf] Stored URL is not a Supabase public object URL for this project:",
      pdfUrl.slice(0, 80),
    );
    return NextResponse.json(
      {
        error:
          "PDF URL is not a Supabase storage link for this project. Re-upload the PDF or fix the URL.",
      },
      { status: 422 },
    );
  }

  const { data: fileBlob, error: dlError } = await supabase.storage
    .from(parsed.bucket)
    .download(parsed.objectPath);

  if (dlError || !fileBlob) {
    console.error("[audit-report-pdf] Storage download:", dlError?.message);
    return NextResponse.json(
      { error: "Could not read PDF from storage" },
      { status: 502 },
    );
  }

  const buf = await fileBlob.arrayBuffer();
  const filename = `${slug}-audit-report.pdf`;

  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, max-age=300",
    },
  });
}
