"use client";

import type { DetailRow } from "@/types/audit-report";

interface AuditDetailsSectionFormProps {
  detailRows: DetailRow[];
  onChange: (detailRows: DetailRow[]) => void;
}

export function AuditDetailsSectionForm({
  detailRows,
  onChange,
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

  return (
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
  );
}
