"use client";

import type { Issue } from "@/types/audit-report";

function generateId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

interface FindingsSectionFormProps {
  issues: Issue[];
  onChange: (issues: Issue[]) => void;
}

export function FindingsSectionForm({
  issues,
  onChange,
}: FindingsSectionFormProps) {
  const updateIssue = (index: number, updates: Partial<Issue>) => {
    const next = [...issues];
    next[index] = { ...next[index], ...updates };
    onChange(next);
  };

  const addIssue = () => {
    onChange([
      ...issues,
      {
        id: generateId(),
        title: "New finding",
        severity: "Minor",
        status: "Acknowledged",
      },
    ]);
  };

  const removeIssue = (index: number) => {
    onChange(issues.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Findings
        </h3>
        <button
          type="button"
          onClick={addIssue}
          className="rounded border border-sky-600 bg-sky-900/40 px-2 py-1 text-[11px] font-medium text-sky-300 hover:bg-sky-900/60"
        >
          Add finding
        </button>
      </div>
      <div className="space-y-2">
        {issues.map((issue, i) => (
          <div
            key={issue.id}
            className="flex flex-wrap items-start gap-2 rounded border border-slate-700/60 bg-slate-800/40 p-3"
          >
            <div className="flex flex-1 flex-col gap-1.5 min-w-0">
              <input
                type="text"
                value={issue.id}
                onChange={(e) => updateIssue(i, { id: e.target.value })}
                className="w-full max-w-[80px] rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs font-mono text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="ID"
              />
              <input
                type="text"
                value={issue.title}
                onChange={(e) => updateIssue(i, { title: e.target.value })}
                className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="Title"
              />
              <select
                value={issue.severity}
                onChange={(e) =>
                  updateIssue(i, { severity: e.target.value })
                }
                className="w-full max-w-[120px] rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
              >
                <option value="Critical">Critical</option>
                <option value="Medium">Medium</option>
                <option value="Minor">Minor</option>
                <option value="Resolved">Resolved</option>
              </select>
              <select
                value={issue.status ?? "Acknowledged"}
                onChange={(e) =>
                  updateIssue(i, { status: e.target.value })
                }
                className="w-full max-w-[160px] rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
              >
                <option value="Acknowledged">Acknowledged</option>
                <option value="Open">Open</option>
                <option value="In progress">In progress</option>
                <option value="Mitigated">Mitigated</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeIssue(i)}
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
