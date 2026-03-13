"use client";

import type {
  AntiWhaleSection,
  AntiWhaleStatRow,
  HoneypotAndAntiWhale,
  HoneypotSection,
} from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

function ChecksEditor({
  checks,
  onChange,
}: {
  checks: string[];
  onChange: (checks: string[]) => void;
}) {
  const update = (i: number, v: string) => {
    const next = [...checks];
    next[i] = v;
    onChange(next);
  };
  const add = () => onChange([...checks, ""]);
  const remove = (i: number) => onChange(checks.filter((_, j) => j !== i));
  return (
    <div className="space-y-2">
      {checks.map((c, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={c}
            onChange={(e) => update(i, e.target.value)}
            className={`${inputClass} flex-1`}
            placeholder="Check item"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="rounded border border-red-700/60 bg-red-900/30 px-2 py-1 text-[11px] text-red-300 hover:bg-red-900/50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="rounded border border-sky-600 bg-sky-900/40 px-2 py-1 text-[11px] font-medium text-sky-300 hover:bg-sky-900/60"
      >
        Add check
      </button>
    </div>
  );
}

function AntiWhaleStatRowsEditor({
  rows,
  onChange,
}: {
  rows: AntiWhaleStatRow[];
  onChange: (rows: AntiWhaleStatRow[]) => void;
}) {
  const update = (i: number, u: Partial<AntiWhaleStatRow>) => {
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
            className={`${inputClass} min-w-[120px]`}
            placeholder="Label"
          />
          <input
            value={r.value}
            onChange={(e) => update(i, { value: e.target.value })}
            className={`${inputClass} w-24`}
            placeholder="Value"
          />
          <input
            value={r.status}
            onChange={(e) => update(i, { status: e.target.value })}
            className={`${inputClass} w-24`}
            placeholder="Status"
          />
        </div>
      ))}
    </div>
  );
}

interface HoneypotAndAntiWhaleSectionFormProps {
  honeypotAndAntiWhale: HoneypotAndAntiWhale;
  onChange: (honeypotAndAntiWhale: HoneypotAndAntiWhale) => void;
}

export function HoneypotAndAntiWhaleSectionForm({
  honeypotAndAntiWhale,
  onChange,
}: HoneypotAndAntiWhaleSectionFormProps) {
  const update = (patch: Partial<HoneypotAndAntiWhale>) => {
    onChange({ ...honeypotAndAntiWhale, ...patch });
  };

  const hp = honeypotAndAntiWhale.honeypot;
  const aw = honeypotAndAntiWhale.antiWhale;

  const updateHoneypot = (patch: Partial<HoneypotSection>) => {
    update({ honeypot: { ...hp, ...patch } });
  };
  const updateAntiWhale = (patch: Partial<AntiWhaleSection>) => {
    update({ antiWhale: { ...aw, ...patch } });
  };

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Honeypot
        </h3>
        <div className="space-y-2">
          <input
            value={hp.status}
            onChange={(e) => updateHoneypot({ status: e.target.value })}
            className={inputClass}
            placeholder="Status"
          />
          <input
            value={hp.note}
            onChange={(e) => updateHoneypot({ note: e.target.value })}
            className={`${inputClass} w-full`}
            placeholder="Note"
          />
          <ChecksEditor
            checks={hp.checks}
            onChange={(checks) => updateHoneypot({ checks })}
          />
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Anti-whale
        </h3>
        <div className="space-y-2">
          {(
            [
              "ringValue",
              "ringSubtitle",
              "title",
              "subLabel",
              "footerLeft",
              "footerRight",
              "baseValue",
              "baseSubLabel",
            ] as const
          ).map((key) => (
            <input
              key={key}
              value={String(aw[key])}
              onChange={(e) =>
                updateAntiWhale({ [key]: e.target.value })
              }
              className={inputClass}
              placeholder={key}
            />
          ))}
          <input
            type="number"
            value={aw.progress}
            onChange={(e) =>
              updateAntiWhale({
                progress: parseFloat(e.target.value) || 0,
              })
            }
            className={inputClass}
            placeholder="Progress %"
          />
          <input
            value={aw.note}
            onChange={(e) => updateAntiWhale({ note: e.target.value })}
            className={`${inputClass} w-full`}
            placeholder="Note"
          />
          <AntiWhaleStatRowsEditor
            rows={aw.statRows}
            onChange={(statRows) => updateAntiWhale({ statRows })}
          />
        </div>
      </div>
    </div>
  );
}
