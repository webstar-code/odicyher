"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { AuditReport, AuditReportRecord } from "@/types/audit-report";
import { AuditReportForm } from "./AuditReportForm";
import { AuditSummaryPreview } from "./AuditSummaryPreview";

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

interface AuditReportEditorProps {
  initialRecord: AuditReportRecord;
  slug: string;
}

export function AuditReportEditor({ initialRecord, slug }: AuditReportEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<AuditReport>(() =>
    deepClone(initialRecord.content)
  );
  const [baselineRecord, setBaselineRecord] = useState<AuditReportRecord>(
    () => initialRecord
  );

  const handleSave = useCallback(
    async (record: AuditReportRecord) => {
      const res = await fetch(`/api/admin/audit-reports/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: record.title,
          status: record.status,
          content: record.content,
          slug: record.slug,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Save failed");
      }

      const savedRecord = { ...initialRecord, ...record };
      setBaselineRecord(savedRecord);

      if (savedRecord.slug !== slug) {
        router.replace(`/admin/audit-reports/${savedRecord.slug}`);
      }
    },
    [slug, initialRecord, router]
  );

  return (
    <section className="grid w-full min-h-0 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/audit-reports"
            className="text-sm text-slate-400 hover:text-slate-200"
          >
            ← All reports
          </Link>
          <h1 className="text-lg font-semibold text-slate-50">Edit audit report</h1>
        </div>
        <AuditReportForm
          baselineRecord={baselineRecord}
          formData={formData}
          onFormDataChange={setFormData}
          onSave={handleSave}
        />
      </div>
      <div className="flex min-h-0 min-w-0 flex-col gap-3">
        <div className="flex shrink-0 items-center justify-between">
          <h2 className="text-sm font-medium text-slate-100">Live preview</h2>
          {baselineRecord.status === "published" && (
            <a
              href={`/audit/${encodeURIComponent(baselineRecord.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-sky-400 hover:text-sky-300"
            >
              View public page
            </a>
          )}
        </div>
        <AuditSummaryPreview data={formData} />
      </div>
    </section>
  );
}
