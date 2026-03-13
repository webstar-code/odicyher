"use client";

import type {
  BurnedAmountMetrics,
  BurnedMetricItem,
} from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";
const labelClass = "mb-0.5 block text-[11px] font-medium text-slate-500";

function BurnedMetricItemsEditor({
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

interface BurnedAmountSectionFormProps {
  burnedAmountMetrics: BurnedAmountMetrics;
  onChange: (burnedAmountMetrics: BurnedAmountMetrics) => void;
}

export function BurnedAmountSectionForm({
  burnedAmountMetrics,
  onChange,
}: BurnedAmountSectionFormProps) {
  const update = (patch: Partial<BurnedAmountMetrics>) => {
    onChange({ ...burnedAmountMetrics, ...patch });
  };

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Totals
        </h3>
        <div className="flex flex-wrap gap-4">
          <label className="block">
            <span className={labelClass}>Total supply burned</span>
            <input
              value={burnedAmountMetrics.totalSupplyBurned}
              onChange={(e) => update({ totalSupplyBurned: e.target.value })}
              className={inputClass}
              placeholder="e.g. 50%"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Label</span>
            <input
              value={burnedAmountMetrics.totalSupplyBurnedLabel}
              onChange={(e) => update({ totalSupplyBurnedLabel: e.target.value })}
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
        <BurnedMetricItemsEditor
          items={burnedAmountMetrics.tokens}
          onChange={(tokens) => update({ tokens })}
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Liquidity
        </h3>
        <BurnedMetricItemsEditor
          items={burnedAmountMetrics.liquidity}
          onChange={(liquidity) => update({ liquidity })}
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Circulating
        </h3>
        <div className="flex flex-wrap gap-4">
          <label className="block">
            <span className={labelClass}>Value</span>
            <input
              value={burnedAmountMetrics.circulating.value}
              onChange={(e) =>
                update({
                  circulating: {
                    ...burnedAmountMetrics.circulating,
                    value: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="e.g. 25"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Suffix</span>
            <input
              value={burnedAmountMetrics.circulating.suffix}
              onChange={(e) =>
                update({
                  circulating: {
                    ...burnedAmountMetrics.circulating,
                    suffix: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="e.g. % or BNB"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Note</span>
            <input
              value={burnedAmountMetrics.circulating.note}
              onChange={(e) =>
                update({
                  circulating: {
                    ...burnedAmountMetrics.circulating,
                    note: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="Additional context for note"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Note suffix</span>
            <input
              value={burnedAmountMetrics.circulating.noteSuffix}
              onChange={(e) =>
                update({
                  circulating: {
                    ...burnedAmountMetrics.circulating,
                    noteSuffix: e.target.value,
                  },
                })
              }
              className={inputClass}
              placeholder="e.g. %"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
