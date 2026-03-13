"use client";

import type {
  LegendItem,
  StatKey,
  SummaryCard,
} from "@/types/audit-report";

const STAT_KEYS: StatKey[] = ["total", "critical", "medium", "minor", "resolved"];
const ICONS = ["findings", "critical", "medium", "minor", "resolved"];

interface SummarySectionFormProps {
  summaryCards: SummaryCard[];
  legendItems: LegendItem[];
  onChange: (patch: {
    summaryCards?: SummaryCard[];
    legendItems?: LegendItem[];
  }) => void;
}

export function SummarySectionForm({
  summaryCards,
  legendItems,
  onChange,
}: SummarySectionFormProps) {
  const updateCard = (index: number, updates: Partial<SummaryCard>) => {
    const next = [...summaryCards];
    next[index] = { ...next[index], ...updates };
    onChange({ summaryCards: next });
  };

  const updateLegend = (index: number, updates: Partial<LegendItem>) => {
    const next = [...legendItems];
    next[index] = { ...next[index], ...updates };
    onChange({ legendItems: next });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Summary cards
        </h3>
        <div className="space-y-2">
          {summaryCards.map((card, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2 rounded border border-slate-700/60 bg-slate-800/40 p-2"
            >
              <input
                type="text"
                value={card.label}
                onChange={(e) => updateCard(i, { label: e.target.value })}
                className="min-w-[100px] rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="Label"
              />
              <input
                type="number"
                value={card.value}
                onChange={(e) =>
                  updateCard(i, { value: parseInt(e.target.value, 10) || 0 })
                }
                className="w-14 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="0"
              />
              <select
                value={card.icon}
                onChange={(e) => updateCard(i, { icon: e.target.value })}
                className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
              >
                {ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              <select
                value={card.tone}
                onChange={(e) =>
                  updateCard(i, { tone: e.target.value as StatKey })
                }
                className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
              >
                {STAT_KEYS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Legend items
        </h3>
        <div className="space-y-2">
          {legendItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2 rounded border border-slate-700/60 bg-slate-800/40 p-2"
            >
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateLegend(i, { label: e.target.value })}
                className="min-w-[80px] rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="Label"
              />
              <input
                type="number"
                value={item.count}
                onChange={(e) =>
                  updateLegend(i, {
                    count: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-14 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                placeholder="0"
              />
              <select
                value={item.tone}
                onChange={(e) =>
                  updateLegend(i, { tone: e.target.value as StatKey })
                }
                className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
              >
                {STAT_KEYS.map((t) => (
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
