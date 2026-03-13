"use client";

import type {
  ContractInformation,
  InformationRow,
} from "@/types/audit-report";

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

function InfoRowsEditor({
  rows,
  onChange,
}: {
  rows: InformationRow[];
  onChange: (rows: InformationRow[]) => void;
}) {
  const update = (i: number, u: Partial<InformationRow>) => {
    const next = [...rows];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  const add = () => {
    onChange([...rows, { label: "", value: "" }]);
  };
  const remove = (i: number) => {
    onChange(rows.filter((_, j) => j !== i));
  };
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex flex-wrap items-center gap-2 rounded border border-slate-700/40 p-2"
        >
          <input
            value={row.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[100px] flex-1`}
            placeholder="Label"
          />
          <input
            value={row.value}
            onChange={(e) => update(i, { value: e.target.value })}
            className={`${inputClass} min-w-[100px] flex-1`}
            placeholder="Value"
          />
          <input
            value={row.actionLabel ?? ""}
            onChange={(e) =>
              update(i, { actionLabel: e.target.value || undefined })
            }
            className={`${inputClass} min-w-[120px]`}
            placeholder="Action label (optional)"
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
        Add row
      </button>
    </div>
  );
}

interface ContractInformationSectionFormProps {
  contractInformation: ContractInformation;
  onChange: (contractInformation: ContractInformation) => void;
}

export function ContractInformationSectionForm({
  contractInformation,
  onChange,
}: ContractInformationSectionFormProps) {
  const update = (patch: Partial<ContractInformation>) => {
    onChange({ ...contractInformation, ...patch });
  };

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Token details
        </h3>
        <InfoRowsEditor
          rows={contractInformation.tokenDetails}
          onChange={(tokenDetails) => update({ tokenDetails })}
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Deployment details
        </h3>
        <InfoRowsEditor
          rows={contractInformation.deploymentDetails}
          onChange={(deploymentDetails) => update({ deploymentDetails })}
        />
      </div>
    </div>
  );
}
