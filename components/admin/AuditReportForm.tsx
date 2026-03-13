"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import type {
  AuditReport,
  AuditReportRecord,
  AuditReportStatus,
} from "@/types/audit-report";
import { SummarySectionForm } from "./sections/SummarySectionForm";
import { FindingsSectionForm } from "./sections/FindingsSectionForm";
import { AuditDetailsSectionForm } from "./sections/AuditDetailsSectionForm";
import { BurnedAmountSectionForm } from "./sections/BurnedAmountSectionForm";
import { LockersSectionForm } from "./sections/LockersSectionForm";
import { ContractSecuritySectionForm } from "./sections/ContractSecuritySectionForm";
import { ContractInformationSectionForm } from "./sections/ContractInformationSectionForm";
import { OwnershipAndLiquiditySectionForm } from "./sections/OwnershipAndLiquiditySectionForm";
import { HolderDistributionSectionForm } from "./sections/HolderDistributionSectionForm";
import { TransactionTaxSectionForm } from "./sections/TransactionTaxSectionForm";
import { HoneypotAndAntiWhaleSectionForm } from "./sections/HoneypotAndAntiWhaleSectionForm";
import { ProjectOverviewSectionForm } from "./sections/ProjectOverviewSectionForm";

const TABS: { id: string; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "findings", label: "Findings" },
  { id: "audit-details", label: "Audit Details" },
  { id: "burned-lockers", label: "Burned & Lockers" },
  { id: "contract-security", label: "Contract Security" },
  { id: "contract-information", label: "Contract Information" },
  { id: "ownership-liquidity", label: "Ownership & Liquidity" },
  { id: "holder-distribution", label: "Holder Distribution" },
  { id: "transaction-tax", label: "Transaction Tax" },
  { id: "honeypot-antiwhale", label: "Honeypot & Anti-Whale" },
  { id: "project-overview", label: "Project Overview" },
];

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface AuditReportFormProps {
  baselineRecord: AuditReportRecord;
  formData: AuditReport;
  onFormDataChange: (data: AuditReport | ((prev: AuditReport) => AuditReport)) => void;
  onSave: (record: AuditReportRecord) => Promise<void>;
}

export function AuditReportForm({
  baselineRecord,
  formData,
  onFormDataChange,
  onSave,
}: AuditReportFormProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [title, setTitle] = useState(baselineRecord.title);
  const [slug, setSlug] = useState(baselineRecord.slug);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const dirty =
    JSON.stringify(formData) !== JSON.stringify(baselineRecord.content) ||
    title !== baselineRecord.title ||
    normalizeSlug(slug) !== baselineRecord.slug;

  const updateSection = useCallback(
    (patch: Partial<AuditReport>) => {
      onFormDataChange((prev) => ({ ...prev, ...patch }));
    },
    [onFormDataChange]
  );

  const handleSave = useCallback(
    async (newStatus?: AuditReportStatus) => {
      setSaveError(null);
      setSaveSuccess(false);
      setSaving(true);
      try {
        const status = newStatus ?? baselineRecord.status;
        const savedSlug = normalizeSlug(slug) || baselineRecord.slug;
        await onSave({
          ...baselineRecord,
          title,
          slug: savedSlug,
          status,
          content: formData,
        });
        setSlug(savedSlug);
        setSaveSuccess(true);
        if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = setTimeout(() => {
          setSaveSuccess(false);
          successTimeoutRef.current = null;
        }, 2500);
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Save failed");
      } finally {
        setSaving(false);
      }
    },
    [baselineRecord, title, slug, formData, onSave]
  );

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full max-w-md rounded border border-slate-700 bg-slate-800/80 px-2 py-1 text-xs font-medium text-slate-100 placeholder-slate-500 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
            placeholder="Report title"
          />
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onBlur={(e) => {
              const n = normalizeSlug(e.target.value);
              if (n) setSlug(n);
            }}
            className="block w-full max-w-md rounded border border-slate-700 bg-slate-800/80 px-2 py-1 text-xs font-mono text-slate-100 placeholder-slate-500 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
            placeholder="Slug (e.g. lfusd-token)"
          />
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                baselineRecord.status === "published"
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40"
                  : "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40"
              }`}
            >
              {baselineRecord.status}
            </span>
            {dirty && (
              <span className="text-[10px] text-amber-400">Unsaved changes</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto border-b border-slate-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 py-2.5 text-[11px] font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-sky-500 text-sky-300 bg-slate-800/50"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 min-h-[200px]">
        {activeTab === "summary" && (
          <SummarySectionForm
            summaryCards={formData.summaryCards}
            legendItems={formData.legendItems}
            onChange={(patch) => updateSection(patch)}
          />
        )}
        {activeTab === "findings" && (
          <FindingsSectionForm
            issues={formData.issues}
            onChange={(issues) => updateSection({ issues })}
          />
        )}
        {activeTab === "audit-details" && (
          <AuditDetailsSectionForm
            detailRows={formData.detailRows}
            onChange={(detailRows) => updateSection({ detailRows })}
          />
        )}
        {activeTab === "burned-lockers" && (
          <div className="space-y-4">
            <BurnedAmountSectionForm
              burnedAmountMetrics={formData.burnedAmountMetrics}
              onChange={(burnedAmountMetrics) =>
                updateSection({ burnedAmountMetrics })
              }
            />
            <LockersSectionForm
              lockersMetrics={formData.lockersMetrics}
              onChange={(lockersMetrics) => updateSection({ lockersMetrics })}
            />
          </div>
        )}
        {activeTab === "contract-security" && (
          <ContractSecuritySectionForm
            contractSecurityMetrics={formData.contractSecurityMetrics}
            onChange={(contractSecurityMetrics) =>
              updateSection({ contractSecurityMetrics })
            }
          />
        )}
        {activeTab === "contract-information" && (
          <ContractInformationSectionForm
            contractInformation={formData.contractInformation}
            onChange={(contractInformation) =>
              updateSection({ contractInformation })
            }
          />
        )}
        {activeTab === "ownership-liquidity" && (
          <OwnershipAndLiquiditySectionForm
            ownershipAndLiquidityRisk={formData.ownershipAndLiquidityRisk}
            onChange={(ownershipAndLiquidityRisk) =>
              updateSection({ ownershipAndLiquidityRisk })
            }
          />
        )}
        {activeTab === "holder-distribution" && (
          <HolderDistributionSectionForm
            holderDistributionAnalysis={formData.holderDistributionAnalysis}
            onChange={(holderDistributionAnalysis) =>
              updateSection({ holderDistributionAnalysis })
            }
          />
        )}
        {activeTab === "transaction-tax" && (
          <TransactionTaxSectionForm
            transactionTaxAnalysis={formData.transactionTaxAnalysis}
            onChange={(transactionTaxAnalysis) =>
              updateSection({ transactionTaxAnalysis })
            }
          />
        )}
        {activeTab === "honeypot-antiwhale" && (
          <HoneypotAndAntiWhaleSectionForm
            honeypotAndAntiWhale={formData.honeypotAndAntiWhale}
            onChange={(honeypotAndAntiWhale) =>
              updateSection({ honeypotAndAntiWhale })
            }
          />
        )}
        {activeTab === "project-overview" && (
          <ProjectOverviewSectionForm
            projectOverview={formData.projectOverview}
            onChange={(projectOverview) =>
              updateSection({ projectOverview })
            }
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 px-4 py-3 bg-slate-900/80">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={!dirty || saving}
            onClick={() => handleSave("draft")}
            className="inline-flex items-center rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            disabled={saving || baselineRecord.status === "published"}
            onClick={() => handleSave("published")}
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publish
          </button>
          <button
            type="button"
            disabled={saving || baselineRecord.status === "draft"}
            onClick={() => handleSave("draft")}
            className="inline-flex items-center rounded-md border border-amber-700 bg-amber-900/40 px-3 py-1.5 text-[11px] font-medium text-amber-200 hover:bg-amber-900/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unpublish
          </button>
          {saveError && (
            <span className="text-[11px] text-red-400">{saveError}</span>
          )}
          {saveSuccess && (
            <span className="text-[11px] text-emerald-400">Saved</span>
          )}
        </div>
        {baselineRecord.status === "published" && (
          <Link
            href={`/audit/${encodeURIComponent(baselineRecord.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-sky-400 hover:text-sky-300"
          >
            View public page
          </Link>
        )}
      </div>
    </div>
  );
}
