"use client";

import type {
  ProjectAction,
  ProjectBadge,
  ProjectBadgeTone,
  ProjectOverview,
} from "@/types/audit-report";

const TONES: ProjectBadgeTone[] = ["amber", "indigo", "blue"];
const ICON_NAMES = ["Globe", "Hexagon", "Link2", "Zap", "CalendarDays"];

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

function ActionsEditor({
  actions,
  onChange,
}: {
  actions: ProjectAction[];
  onChange: (actions: ProjectAction[]) => void;
}) {
  const update = (i: number, u: Partial<ProjectAction>) => {
    const next = [...actions];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  const add = () => onChange([...actions, { label: "", icon: "Globe" }]);
  const remove = (i: number) => onChange(actions.filter((_, j) => j !== i));
  return (
    <div className="space-y-2">
      {actions.map((a, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <input
            value={a.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[100px]`}
            placeholder="Label"
          />
          <select
            value={a.icon ?? "Globe"}
            onChange={(e) => update(i, { icon: e.target.value })}
            className={inputClass}
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
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
        Add action
      </button>
    </div>
  );
}

function BadgesEditor({
  badges,
  onChange,
}: {
  badges: ProjectBadge[];
  onChange: (badges: ProjectBadge[]) => void;
}) {
  const update = (i: number, u: Partial<ProjectBadge>) => {
    const next = [...badges];
    next[i] = { ...next[i], ...u };
    onChange(next);
  };
  const add = () =>
    onChange([...badges, { label: "", icon: "Hexagon", tone: "amber" }]);
  const remove = (i: number) => onChange(badges.filter((_, j) => j !== i));
  return (
    <div className="space-y-2">
      {badges.map((b, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <input
            value={b.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[100px]`}
            placeholder="Label"
          />
          <select
            value={b.icon ?? "Hexagon"}
            onChange={(e) => update(i, { icon: e.target.value })}
            className={inputClass}
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={b.tone}
            onChange={(e) =>
              update(i, { tone: e.target.value as ProjectBadgeTone })
            }
            className={inputClass}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
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
        Add badge
      </button>
    </div>
  );
}

interface ProjectOverviewSectionFormProps {
  projectOverview: ProjectOverview;
  onChange: (projectOverview: ProjectOverview) => void;
}

export function ProjectOverviewSectionForm({
  projectOverview,
  onChange,
}: ProjectOverviewSectionFormProps) {
  const update = (patch: Partial<ProjectOverview>) => {
    onChange({ ...projectOverview, ...patch });
  };

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Basic info
        </h3>
        <div className="space-y-2">
          <input
            value={projectOverview.title}
            onChange={(e) => update({ title: e.target.value })}
            className={`${inputClass} w-full`}
            placeholder="Title"
          />
          <input
            value={projectOverview.website}
            onChange={(e) => update({ website: e.target.value })}
            className={`${inputClass} w-full`}
            placeholder="Website"
          />
          <textarea
            value={projectOverview.description}
            onChange={(e) => update({ description: e.target.value })}
            className={`${inputClass} w-full min-h-[80px]`}
            placeholder="Description"
          />
          <input
            value={projectOverview.onboarded}
            onChange={(e) => update({ onboarded: e.target.value })}
            className={inputClass}
            placeholder="Onboarded"
          />
          <input
            value={projectOverview.verifiedLabel}
            onChange={(e) => update({ verifiedLabel: e.target.value })}
            className={inputClass}
            placeholder="Verified label"
          />
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Actions
        </h3>
        <ActionsEditor
          actions={projectOverview.actions}
          onChange={(actions) => update({ actions })}
        />
      </div>
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Badges
        </h3>
        <BadgesEditor
          badges={projectOverview.badges}
          onChange={(badges) => update({ badges })}
        />
      </div>
    </div>
  );
}
