"use client";

import type {
  TaxBreakdownRow,
  TaxItem,
  TransactionTaxAnalysis,
  TransactionTaxLiquidityRisk,
} from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

function TaxItemsEditor({
  items,
  onChange,
}: {
  items: TaxItem[];
  onChange: (items: TaxItem[]) => void;
}) {
  const update = (i: number, u: Partial<TaxItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <input
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[80px]`}
            placeholder="Label"
          />
          <input
            value={item.value}
            onChange={(e) => update(i, { value: e.target.value })}
            className={`${inputClass} w-20`}
            placeholder="Value"
          />
          <input
            type="number"
            value={item.progress}
            onChange={(e) =>
              update(i, { progress: parseFloat(e.target.value) || 0 })
            }
            className={`${inputClass} w-16`}
            placeholder="Progress"
          />
          <input
            value={item.fillClassName}
            onChange={(e) => update(i, { fillClassName: e.target.value })}
            className={`${inputClass} min-w-[200px] flex-1`}
            placeholder="fillClassName (CSS)"
          />
        </div>
      ))}
    </div>
  );
}

function BreakdownRowsEditor({
  rows,
  onChange,
}: {
  rows: TaxBreakdownRow[];
  onChange: (rows: TaxBreakdownRow[]) => void;
}) {
  const keys: (keyof TaxBreakdownRow)[] = [
    "tax",
    "taxValue",
    "buyLabel",
    "buyValue",
    "sellLabel",
    "sellValue",
  ];
  const update = (i: number, u: Partial<TaxBreakdownRow>) => {
    const next = [...rows];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          {keys.map((key) => (
            <input
              key={key}
              value={String(row[key])}
              onChange={(e) => update(i, { [key]: e.target.value })}
              className={`${inputClass} min-w-[80px]`}
              placeholder={key}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface TransactionTaxSectionFormProps {
  transactionTaxAnalysis: TransactionTaxAnalysis;
  onChange: (transactionTaxAnalysis: TransactionTaxAnalysis) => void;
}

export function TransactionTaxSectionForm({
  transactionTaxAnalysis,
  onChange,
}: TransactionTaxSectionFormProps) {
  const update = (patch: Partial<TransactionTaxAnalysis>) => {
    onChange({ ...transactionTaxAnalysis, ...patch });
  };

  const { taxes, breakdownRows, note, liquidityRisk } = transactionTaxAnalysis;

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Taxes
        </h3>
        <TaxItemsEditor
          items={taxes}
          onChange={(items) => update({ taxes: items })}
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Breakdown rows
        </h3>
        <BreakdownRowsEditor
          rows={breakdownRows}
          onChange={(rows) => update({ breakdownRows: rows })}
        />
      </div>
      <div className={sectionClass}>
        <input
          value={note}
          onChange={(e) => update({ note: e.target.value })}
          className={`${inputClass} w-full`}
          placeholder="Note"
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Liquidity risk
        </h3>
        <div className="space-y-2">
          {(
            [
              "title",
              "topHolderTitle",
              "holder",
              "chipValue",
              "footerLabel",
              "footerValue",
              "lockedTitle",
              "lockedLeftValue",
              "lockedRightValue",
              "lockedSubLabel",
              "lockedPercent",
            ] as const
          ).map((key) => (
            <input
              key={key}
              value={String(liquidityRisk[key] ?? "")}
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
    </div>
  );
}
