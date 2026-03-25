"use client";

import { useRef, useState } from "react";

import type {
  ProjectAction,
  ProjectBadge,
  ProjectBadgeTone,
  ProjectOverview,
} from "@/types/audit-report";

type BrandingPatch = {
  brandName?: string;
  brandLogoSrc?: string;
};

const TONES: ProjectBadgeTone[] = ["amber", "indigo", "blue"];
const ICON_NAMES = ["Globe", "Hexagon", "Link2", "Zap", "CalendarDays"];

const inputClass =
  "rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-sky-500 focus:outline-none";
const sectionClass = "rounded border border-slate-700/60 bg-slate-800/40 p-3";

const btnSecondaryClass =
  "rounded border border-sky-600 bg-sky-900/40 px-2 py-1 text-[11px] font-medium text-sky-300 hover:bg-sky-900/60 disabled:cursor-not-allowed disabled:opacity-50";

function BrandLogoField({
  reportSlug,
  brandLogoSrc,
  onBrandingChange,
}: {
  reportSlug: string;
  brandLogoSrc: string;
  onBrandingChange: (patch: BrandingPatch) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runUpload = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("reportSlug", reportSlug);
      const res = await fetch("/api/admin/brand-logo", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const data: unknown = await res.json().catch(() => ({}));
      const errMsg =
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;
      if (!res.ok) {
        throw new Error(errMsg ?? "Upload failed");
      }
      const url =
        data &&
        typeof data === "object" &&
        "url" in data &&
        typeof (data as { url: unknown }).url === "string"
          ? (data as { url: string }).url
          : null;
      if (!url) {
        throw new Error("Invalid response from server");
      }
      onBrandingChange({ brandLogoSrc: url });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) void runUpload(file);
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className={btnSecondaryClass}
        >
          {uploading ? "Uploading…" : "Upload logo (Supabase)"}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
      <input
        value={brandLogoSrc}
        onChange={(e) => onBrandingChange({ brandLogoSrc: e.target.value })}
        className={`${inputClass} w-full font-mono text-[11px]`}
        placeholder="https://… or /images/logo.svg"
      />
    </div>
  );
}

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
  const add = () =>
    onChange([...actions, { label: "", icon: "Globe", href: "" }]);
  const remove = (i: number) => onChange(actions.filter((_, j) => j !== i));
  return (
    <div className="space-y-2">
      {actions.map((a, i) => (
        <div key={i} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            value={a.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={`${inputClass} min-w-[100px]`}
            placeholder="Label (e.g. Twitter)"
          />
          <input
            value={a.href ?? ""}
            onChange={(e) => update(i, { href: e.target.value })}
            className={`${inputClass} min-w-[180px] flex-1 sm:max-w-md`}
            placeholder="https://…"
            type="text"
            inputMode="url"
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
        Add link
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
  brandName: string;
  brandLogoSrc: string;
  /** Current report slug (normalized) — used as the storage folder for uploads. */
  reportSlug: string;
  onChange: (projectOverview: ProjectOverview) => void;
  onBrandingChange: (patch: BrandingPatch) => void;
}

export function ProjectOverviewSectionForm({
  projectOverview,
  brandName,
  brandLogoSrc,
  reportSlug,
  onChange,
  onBrandingChange,
}: ProjectOverviewSectionFormProps) {
  const update = (patch: Partial<ProjectOverview>) => {
    onChange({ ...projectOverview, ...patch });
  };

  return (
    <div className="space-y-4">
      <div className={sectionClass}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Branding
        </h3>
        <p className="mb-2 text-[11px] text-slate-500">
          Brand name and logo URL are saved with this report. Upload stores the file in
          Supabase Storage and sets the logo URL automatically; you can still paste a URL
          or /public path.
        </p>
        <div className="space-y-2">
          <input
            value={brandName}
            onChange={(e) => onBrandingChange({ brandName: e.target.value })}
            className={`${inputClass} w-full`}
            placeholder="Brand name (e.g. ODICYBER)"
          />
          <p className="text-[10px] text-slate-500">Logo image</p>
          <BrandLogoField
            reportSlug={reportSlug}
            brandLogoSrc={brandLogoSrc}
            onBrandingChange={onBrandingChange}
          />
        </div>
      </div>
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
          Social & project links
        </h3>
        <p className="mb-2 text-[11px] text-slate-500">
          Label and icon appear on the audit page; URL opens in a new tab when set.
        </p>
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
