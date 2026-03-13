"use client";

import type { BurnedMetricItem, LockersMetrics } from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";
const labelClass = "mb-0.5 block text-[11px] font-medium text-slate-500";

function MetricItemsEditor({
  items,
  onChange,
}: {
  items: BurnedMetricItem[];
  onChange: (items: BurnedMetricItem[]) => void;
}) {
  const update = (i: number, u: Partial<BurnedMetricItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex flex-wrap items-end gap-3 rounded border border-slate-700/40 bg-slate-900/30 p-2">
          <label className="block">
            <span className={labelClass}>Label</span>
            <input
              value={item.label}
              onChange={(e) => update(i, { label: e.target.value })}
              className={`${inputClass} min-w-[80px]`}
              placeholder="e.g. Token Name"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Value</span>
            <input
              value={item.value}
              onChange={(e) => update(i, { value: e.target.value })}
              className={`${inputClass} w-20`}
              placeholder="e.g. 100"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Suffix</span>
            <input
              value={item.suffix}
              onChange={(e) => update(i, { suffix: e.target.value })}
              className={`${inputClass} min-w-[100px]`}
              placeholder="e.g. % or BNB"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Color</span>
            <input
              value={item.color}
              onChange={(e) => update(i, { color: e.target.value })}
              className={`${inputClass} w-24`}
              placeholder="#hex"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

interface LockersSectionFormProps {
  lockersMetrics: LockersMetrics;
  onChange: (lockersMetrics: LockersMetrics) => void;
}

export function LockersSectionForm({
  lockersMetrics,
  onChange,
}: LockersSectionFormProps) {
  const update = (patch: Partial<LockersMetrics>) => {
    onChange({ ...lockersMetrics, ...patch });
  };

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Totals
        </h3>
        <div className="flex flex-wrap gap-4">
          <label className="block">
            <span className={labelClass}>Total tokens locked</span>
            <input
              value={lockersMetrics.totalTokensLocked}
              onChange={(e) => update({ totalTokensLocked: e.target.value })}
              className={inputClass}
              placeholder="e.g. 45%"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Label</span>
            <input
              value={lockersMetrics.totalTokensLockedLabel}
              onChange={(e) => update({ totalTokensLockedLabel: e.target.value })}
              className={inputClass}
              placeholder="e.g. of total supply"
            />
          </label>
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Tokens
        </h3>
        <MetricItemsEditor
          items={lockersMetrics.tokens}
          onChange={(tokens) => update({ tokens })}
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Liquidity
        </h3>
        <MetricItemsEditor
          items={lockersMetrics.liquidity}
          onChange={(liquidity) => update({ liquidity })}
        />
      </div>
    </div>
  );
}
