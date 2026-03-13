"use client";

import type {
  OwnershipAndLiquidityRisk,
  OwnershipHolder,
} from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

function HoldersEditor({
  holders,
  onChange,
}: {
  holders: OwnershipHolder[];
  onChange: (holders: OwnershipHolder[]) => void;
}) {
  const update = (i: number, u: Partial<OwnershipHolder>) => {
    const next = [...holders];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {holders.map((h, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <input
            value={h.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[100px]`}
            placeholder="Label"
          />
          <input
            value={h.value}
            onChange={(e) => update(i, { value: e.target.value })}
            className={`${inputClass} w-24`}
            placeholder="Value"
          />
          <input
            value={h.suffix}
            onChange={(e) => update(i, { suffix: e.target.value })}
            className={`${inputClass} min-w-[80px]`}
            placeholder="Suffix"
          />
          <input
            value={h.color}
            onChange={(e) => update(i, { color: e.target.value })}
            className={`${inputClass} w-24`}
            placeholder="#hex"
          />
        </div>
      ))}
    </div>
  );
}

interface OwnershipAndLiquiditySectionFormProps {
  ownershipAndLiquidityRisk: OwnershipAndLiquidityRisk;
  onChange: (ownershipAndLiquidityRisk: OwnershipAndLiquidityRisk) => void;
}

export function OwnershipAndLiquiditySectionForm({
  ownershipAndLiquidityRisk,
  onChange,
}: OwnershipAndLiquiditySectionFormProps) {
  const update = (patch: Partial<OwnershipAndLiquidityRisk>) => {
    onChange({ ...ownershipAndLiquidityRisk, ...patch });
  };

  const oc = ownershipAndLiquidityRisk.ownerControl;
  const lh = ownershipAndLiquidityRisk.liquidityHolder;
  const ll = ownershipAndLiquidityRisk.lockedLiquidity;

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Owner control
        </h3>
        <div className="space-y-2">
          <input
            value={oc.value}
            onChange={(e) =>
              update({
                ownerControl: { ...oc, value: e.target.value },
              })
            }
            className={inputClass}
            placeholder="Value"
          />
          <input
            value={oc.subtitle}
            onChange={(e) =>
              update({
                ownerControl: { ...oc, subtitle: e.target.value },
              })
            }
            className={inputClass}
            placeholder="Subtitle"
          />
          <input
            type="number"
            value={oc.progress}
            onChange={(e) =>
              update({
                ownerControl: { ...oc, progress: parseFloat(e.target.value) || 0 },
              })
            }
            className={inputClass}
            placeholder="Progress %"
          />
          <input
            value={oc.warning}
            onChange={(e) =>
              update({ ownerControl: { ...oc, warning: e.target.value } })
            }
            className={`${inputClass} w-full`}
            placeholder="Warning"
          />
          <HoldersEditor
            holders={oc.holders}
            onChange={(holders) =>
              update({ ownerControl: { ...oc, holders } })
            }
          />
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Liquidity holder
        </h3>
        <div className="space-y-2">
          {(
            ["title", "holder", "chipPrimary", "chipSecondary", "footerLabel", "footerValue"] as const
          ).map((key) => (
            <input
              key={key}
              value={String(lh[key])}
              onChange={(e) =>
                update({
                  liquidityHolder: { ...lh, [key]: e.target.value },
                })
              }
              className={inputClass}
              placeholder={key}
            />
          ))}
          <input
            type="number"
            value={lh.progress}
            onChange={(e) =>
              update({
                liquidityHolder: {
                  ...lh,
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
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Locked liquidity
        </h3>
        <div className="space-y-2">
          {(["title", "leftValue", "rightValue", "subLabel", "rightPercent"] as const).map(
            (key) => (
              <input
                key={key}
                value={String(ll[key])}
                onChange={(e) =>
                  update({
                    lockedLiquidity: { ...ll, [key]: e.target.value },
                  })
                }
                className={inputClass}
                placeholder={key}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
