"use client";

import type {
  ContractSecurityMetrics,
  SecurityCheck,
  SecurityCheckTone,
} from "@/types/audit-report";

const TONES: SecurityCheckTone[] = ["safe", "review", "missing"];
const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";

interface ContractSecuritySectionFormProps {
  contractSecurityMetrics: ContractSecurityMetrics;
  onChange: (contractSecurityMetrics: ContractSecurityMetrics) => void;
}

export function ContractSecuritySectionForm({
  contractSecurityMetrics,
  onChange,
}: ContractSecuritySectionFormProps) {
  const update = (patch: Partial<ContractSecurityMetrics>) => {
    onChange({ ...contractSecurityMetrics, ...patch });
  };

  const updateCheck = (index: number, updates: Partial<SecurityCheck>) => {
    const next = [...contractSecurityMetrics.checks];
    next[index] = { ...next[index], ...updates };
    update({ checks: next });
  };

  return (
    <div className="space-y-4">
      <div className="rounded border border-slate-700/60 bg-slate-800/40 p-3">
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Score
        </h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="number"
            value={contractSecurityMetrics.score}
            onChange={(e) =>
              update({ score: parseInt(e.target.value, 10) || 0 })
            }
            className={inputClass}
          />
          <span className="self-center text-slate-500">/</span>
          <input
            type="number"
            value={contractSecurityMetrics.maxScore}
            onChange={(e) =>
              update({ maxScore: parseInt(e.target.value, 10) || 0 })
            }
            className={inputClass}
          />
        </div>
        <input
          value={contractSecurityMetrics.summary}
          onChange={(e) => update({ summary: e.target.value })}
          className={`${inputClass} mt-2 w-full`}
          placeholder="Summary"
        />
      </div>
      <div className="rounded border border-slate-700/60 bg-slate-800/40 p-3">
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Security checks
        </h3>
        <div className="space-y-2">
          {contractSecurityMetrics.checks.map((check, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2 rounded border border-slate-700/40 p-2"
            >
              <input
                value={check.label}
                onChange={(e) => updateCheck(i, { label: e.target.value })}
                className={`${inputClass} min-w-[140px] flex-1`}
                placeholder="Label"
              />
              <input
                value={check.status}
                onChange={(e) => updateCheck(i, { status: e.target.value })}
                className={`${inputClass} w-24`}
                placeholder="Status"
              />
              <select
                value={check.tone}
                onChange={(e) =>
                  updateCheck(i, { tone: e.target.value as SecurityCheckTone })
                }
                className={inputClass}
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
