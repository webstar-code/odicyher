"use client";

import type {
  HolderDistributionAnalysis,
  WhaleCategoryRow,
} from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

function WhaleRowsEditor({
  rows,
  onChange,
}: {
  rows: WhaleCategoryRow[];
  onChange: (rows: WhaleCategoryRow[]) => void;
}) {
  const update = (i: number, u: Partial<WhaleCategoryRow>) => {
    const next = [...rows];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <input
            value={r.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[80px]`}
            placeholder="Label"
          />
          <input
            value={r.value}
            onChange={(e) => update(i, { value: e.target.value })}
            className={`${inputClass} w-24`}
            placeholder="Value"
          />
          <input
            value={r.color}
            onChange={(e) => update(i, { color: e.target.value })}
            className={`${inputClass} w-24`}
            placeholder="#hex"
          />
          <label className="flex items-center gap-1 text-slate-400">
            <input
              type="checkbox"
              checked={r.active ?? false}
              onChange={(e) => update(i, { active: e.target.checked })}
              className="rounded"
            />
            Active
          </label>
        </div>
      ))}
    </div>
  );
}

interface HolderDistributionSectionFormProps {
  holderDistributionAnalysis: HolderDistributionAnalysis;
  onChange: (holderDistributionAnalysis: HolderDistributionAnalysis) => void;
}

export function HolderDistributionSectionForm({
  holderDistributionAnalysis,
  onChange,
}: HolderDistributionSectionFormProps) {
  const update = (patch: Partial<HolderDistributionAnalysis>) => {
    onChange({ ...holderDistributionAnalysis, ...patch });
  };

  const { score, whaleCategory, liquidityRisk, note } =
    holderDistributionAnalysis;

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Score
        </h3>
        <div className="space-y-2">
          <input
            value={score.value}
            onChange={(e) =>
              update({ score: { ...score, value: e.target.value } })
            }
            className={inputClass}
            placeholder="Value"
          />
          <input
            value={score.subtitle}
            onChange={(e) =>
              update({ score: { ...score, subtitle: e.target.value } })
            }
            className={inputClass}
            placeholder="Subtitle"
          />
          <input
            type="number"
            value={score.progress}
            onChange={(e) =>
              update({
                score: { ...score, progress: parseFloat(e.target.value) || 0 },
              })
            }
            className={inputClass}
            placeholder="Progress %"
          />
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Whale category
        </h3>
        <div className="space-y-2">
          <input
            value={whaleCategory.title}
            onChange={(e) =>
              update({
                whaleCategory: { ...whaleCategory, title: e.target.value },
              })
            }
            className={inputClass}
            placeholder="Title"
          />
          <input
            value={whaleCategory.value}
            onChange={(e) =>
              update({
                whaleCategory: { ...whaleCategory, value: e.target.value },
              })
            }
            className={inputClass}
            placeholder="Value"
          />
          <input
            type="number"
            value={whaleCategory.progress}
            onChange={(e) =>
              update({
                whaleCategory: {
                  ...whaleCategory,
                  progress: parseFloat(e.target.value) || 0,
                },
              })
            }
            className={inputClass}
            placeholder="Progress %"
          />
          <WhaleRowsEditor
            rows={whaleCategory.rows}
            onChange={(rows) =>
              update({ whaleCategory: { ...whaleCategory, rows } })
            }
          />
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Liquidity risk
        </h3>
        <div className="space-y-2">
          {(
            ["score", "subtitle", "holder", "primaryValue", "secondaryValue", "bottomShare", "bottomAmount"] as const
          ).map((key) => (
            <input
              key={key}
              value={String(liquidityRisk[key])}
              onChange={(e) =>
                update({
                  liquidityRisk: { ...liquidityRisk, [key]: e.target.value },
                })
              }
              className={inputClass}
              placeholder={key}
            />
          ))}
          <input
            type="number"
            value={liquidityRisk.progress}
            onChange={(e) =>
              update({
                liquidityRisk: {
                  ...liquidityRisk,
                  progress: parseFloat(e.target.value) || 0,
                },
              })
            }
            className={inputClass}
            placeholder="Progress %"
          />
        </div>
      </div>
      <div className={sectionClass}>
        <input
          value={note}
          onChange={(e) => update({ note: e.target.value })}
          className={`${inputClass} w-full`}
          placeholder="Note"
        />
      </div>
    </div>
  );
}
