"use client";

import { useRef, useState } from "react";

import type { DetailRow } from "@/types/audit-report";

const inputClass =
  "w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs font-mono text-slate-100 focus:border-sky-500 focus:outline-none";
const btnSecondaryClass =
  "rounded border border-sky-600 bg-sky-900/40 px-2 py-1 text-[11px] font-medium text-sky-300 hover:bg-sky-900/60 disabled:cursor-not-allowed disabled:opacity-50";

interface AuditDetailsSectionFormProps {
  detailRows: DetailRow[];
  onChange: (detailRows: DetailRow[]) => void;
  fullReportPdfSrc: string;
  reportSlug: string;
  onPdfSrcChange: (url: string) => void;
}

export function AuditDetailsSectionForm({
  detailRows,
  onChange,
  fullReportPdfSrc,
  reportSlug,
  onPdfSrcChange,
}: AuditDetailsSectionFormProps) {
  const updateRow = (index: number, updates: Partial<DetailRow>) => {
    const next = [...detailRows];
    next[index] = { ...next[index], ...updates };
    onChange(next);
  };

  const addRow = () => {
    onChange([...detailRows, { label: "", value: "" }]);
  };

  const removeRow = (index: number) => {
    onChange(detailRows.filter((_, i) => i !== index));
  };

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const runPdfUpload = async (file: File) => {
    setPdfError(null);
    setPdfUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("reportSlug", reportSlug);
      const res = await fetch("/api/admin/audit-report-pdf", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const data: unknown = await res.json().catch(() => ({}));
      const errMsg =
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;
      if (!res.ok) {
        throw new Error(errMsg ?? "Upload failed");
      }
      const url =
        data &&
        typeof data === "object" &&
        "url" in data &&
        typeof (data as { url: unknown }).url === "string"
          ? (data as { url: string }).url
          : null;
      if (!url) {
        throw new Error("Invalid response from server");
      }
      onPdfSrcChange(url);
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setPdfUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded border border-slate-700/60 bg-slate-800/40 p-3">
        <h3 className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Full audit report (PDF)
        </h3>
        <p className="text-[11px] text-slate-500">
          Upload the signed PDF report. It is stored in Supabase (same public bucket as logos,
          under <span className="font-mono text-slate-400">{reportSlug || "slug"}/reports/</span>
          ). The public audit page shows a download button that uses this URL.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void runPdfUpload(file);
            }}
          />
          <button
            type="button"
            disabled={pdfUploading}
            onClick={() => pdfInputRef.current?.click()}
            className={btnSecondaryClass}
          >
            {pdfUploading ? "Uploading…" : "Upload PDF"}
          </button>
          {fullReportPdfSrc ? (
            <a
              href={fullReportPdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-sky-400 hover:text-sky-300"
            >
              Open current PDF
            </a>
          ) : null}
        </div>
        {pdfError && <p className="text-[11px] text-red-400">{pdfError}</p>}
        <input
          type="text"
          value={fullReportPdfSrc}
          onChange={(e) => onPdfSrcChange(e.target.value)}
          className={inputClass}
          placeholder="https://… (set automatically after upload)"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Audit details
          </h3>
          <button
            type="button"
            onClick={addRow}
            className="rounded border border-sky-600 bg-sky-900/40 px-2 py-1 text-[11px] font-medium text-sky-300 hover:bg-sky-900/60"
          >
            Add row
          </button>
        </div>
        <div className="space-y-2">
          {detailRows.map((row, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2 rounded border border-slate-700/60 bg-slate-800/40 p-2"
            >
              <input
                type="text"
                value={row.label}
                onChange={(e) => updateRow(i, { label: e.target.value })}
                className="min-w-[120px] flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="Label"
              />
              <input
                type="text"
                value={row.value}
                onChange={(e) => updateRow(i, { value: e.target.value })}
                className="min-w-[120px] flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="shrink-0 rounded border border-red-700/60 bg-red-900/30 px-2 py-1 text-[11px] text-red-300 hover:bg-red-900/50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
