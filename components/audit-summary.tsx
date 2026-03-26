"use client";

import Image from "next/image";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronUp,
  Copy,
  Download,
  Globe,
  Hexagon,
  Link2,
  Shield,
  X,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import { Fragment, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseSupabasePublicObjectUrl } from "@/lib/supabase-storage-path";
import { cn } from "@/lib/utils";
import type { AuditReport, StatKey } from "@/types/audit-report";
import { defaultAuditReport } from "@/lib/default-audit-report";

const DEFAULT_BRAND_NAME = "ODICYBER";
const DEFAULT_BRAND_LOGO_SRC = "/images/logo.svg";

type ResolvedAuditBrand = { name: string; logoSrc: string };

function resolveAuditBrand(data: AuditReport): ResolvedAuditBrand {
  const name = data.brandName?.trim();
  const raw = data.brandLogoSrc?.trim();
  let logoSrc = DEFAULT_BRAND_LOGO_SRC;
  if (raw) {
    if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) {
      logoSrc = raw;
    } else {
      logoSrc = raw.startsWith("/") ? raw : `/${raw}`;
    }
  }
  return {
    name: name || DEFAULT_BRAND_NAME,
    logoSrc,
  };
}

function BrandLogoImage({
  src,
  alt,
  className,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  if (/^(https?:)?\/\//i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

const STATUS_COLORS: Record<StatKey, string> = {
  total: "#2D3A53",
  critical: "#d94d43",
  medium: "#e5a54b",
  minor: "#3d8fe8",
  resolved: "#1da564",
};

const SURFACE_NOISE_TEXTURE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.65'/%3E%3C/svg%3E";

const statCardGradients: Record<StatKey, string> = {
  total:
    "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(250,245,237,0.98) 100%), radial-gradient(circle at 16% 20%, rgba(188,194,205,0.35), transparent 42%)",
  critical:
    "linear-gradient(180deg, rgba(255,252,250,0.96) 0%, rgba(250,241,235,0.98) 100%), radial-gradient(circle at 16% 20%, rgba(217,77,67,0.30), transparent 40%)",
  medium:
    "linear-gradient(180deg, rgba(255,253,248,0.96) 0%, rgba(251,243,231,0.98) 100%), radial-gradient(circle at 16% 20%, rgba(229,165,75,0.30), transparent 40%)",
  minor:
    "linear-gradient(180deg, rgba(250,252,255,0.96) 0%, rgba(240,246,255,0.98) 100%), radial-gradient(circle at 16% 20%, rgba(61,143,232,0.30), transparent 40%)",
  resolved:
    "linear-gradient(180deg, rgba(250,255,252,0.96) 0%, rgba(240,249,243,0.98) 100%), radial-gradient(circle at 16% 20%, rgba(29,165,100,0.30), transparent 40%)",
};

const darkPanelClassName =
  "rounded-[18px] border border-[#b8a078]/60 bg-[rgba(30,40,65,0.75)] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm";

type MetricItem = AuditReport["burnedAmountMetrics"]["tokens"][number];

const COMPACT_NUMBER_MULTIPLIERS: Record<string, number> = {
  K: 1_000,
  M: 1_000_000,
  B: 1_000_000_000,
  T: 1_000_000_000_000,
};

function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, value));
}

function parsePercentage(value?: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/-?\d+(?:\.\d+)?(?=\s*%)/);
  if (!match) {
    return null;
  }

  return clampPercentage(Number.parseFloat(match[0]));
}

function parseCompactNumber(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replaceAll(",", "");
  const match = normalized.match(/^(-?\d+(?:\.\d+)?)\s*([KMBT])?$/i);
  if (!match) {
    return null;
  }

  const amount = Number.parseFloat(match[1]);
  const unit = match[2]?.toUpperCase();

  return Number.isFinite(amount) ? amount * (unit ? COMPACT_NUMBER_MULTIPLIERS[unit] : 1) : null;
}

function formatPercentage(value: number) {
  return `${Number(value.toFixed(value < 1 ? 2 : 1)).toString()}%`;
}

function buildRingBackground(progress: number) {
  const safeProgress = clampPercentage(progress);
  const progressDegrees = safeProgress * 3.6;

  return `conic-gradient(from 220deg, rgba(117,204,255,1) 0deg, rgba(112,141,255,1) ${progressDegrees}deg, rgba(33,48,84,0.78) ${progressDegrees}deg, rgba(14,22,41,0.94) 360deg)`;
}

function resolvePercentageFromSources(
  textSources: Array<string | null | undefined>,
  numericFallback?: number
) {
  for (const textSource of textSources) {
    const parsedValue = parsePercentage(textSource);
    if (parsedValue !== null) {
      return parsedValue;
    }
  }

  return clampPercentage(numericFallback ?? 0);
}

function resolveTotalSupplyAmount(data: AuditReport) {
  const tokenSupplyRow = data.contractInformation.tokenDetails.find((row) =>
    row.label.toLowerCase().includes("total supply")
  );

  return (
    parseCompactNumber(tokenSupplyRow?.value) ??
    parseCompactNumber(data.burnedAmountMetrics.tokens[0]?.value) ??
    parseCompactNumber(data.lockersMetrics.tokens[0]?.value) ??
    null
  );
}

function resolveItemSharePercentage(itemValue: string, totalValue: number | null) {
  const itemAmount = parseCompactNumber(itemValue);

  if (itemAmount !== null && totalValue !== null && totalValue > 0) {
    return clampPercentage((itemAmount / totalValue) * 100);
  }

  return null;
}

function sumHolderPercentages(
  holders: AuditReport["ownershipAndLiquidityRisk"]["ownerControl"]["holders"],
  totalSupplyAmount: number | null
) {
  let totalPercentage = 0;
  let foundPercentage = false;

  for (const holder of holders) {
    const holderPercentage =
      parsePercentage(holder.suffix) ?? resolveItemSharePercentage(holder.value, totalSupplyAmount);

    if (holderPercentage !== null) {
      totalPercentage += holderPercentage;
      foundPercentage = true;
    }
  }

  return foundPercentage ? clampPercentage(totalPercentage) : null;
}

function resolveActiveSharePercentage(
  rows: AuditReport["holderDistributionAnalysis"]["whaleCategory"]["rows"]
) {
  const activeRow = rows.find((row) => row.active) ?? rows[0];
  const totalValue = rows.reduce((sum, row) => sum + (parseCompactNumber(row.value) ?? 0), 0);
  const activeValue = parseCompactNumber(activeRow?.value);

  if (activeRow && activeValue !== null && totalValue > 0) {
    return clampPercentage((activeValue / totalValue) * 100);
  }

  return null;
}

function resolveMetricPercentage({
  items,
  keywords,
  fallbackText,
}: {
  items: MetricItem[];
  keywords: string[];
  fallbackText?: string;
}) {
  const highlightedItem =
    items.find((item) =>
      keywords.some((keyword) => item.label.toLowerCase().includes(keyword))
    ) ?? items[1];

  const explicitPercentage =
    parsePercentage(highlightedItem?.suffix) ?? parsePercentage(highlightedItem?.value);

  if (explicitPercentage !== null) {
    return explicitPercentage;
  }

  const totalValue = parseCompactNumber(items[0]?.value);
  const highlightedValue = parseCompactNumber(highlightedItem?.value);

  if (
    totalValue !== null &&
    highlightedValue !== null &&
    Number.isFinite(totalValue) &&
    Number.isFinite(highlightedValue) &&
    totalValue > 0
  ) {
    return clampPercentage((highlightedValue / totalValue) * 100);
  }

  return parsePercentage(fallbackText) ?? 0;
}

async function copyTextToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy selection-based approach below.
    }
  }

  if (typeof document === "undefined") {
    return false;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

function CopyIconButton({
  text,
  ariaLabel,
  className,
}: {
  text: string;
  ariaLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const didCopy = await copyTextToClipboard(text);

    if (!didCopy) {
      return;
    }

    setCopied(true);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimeoutRef.current = null;
    }, 1400);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      className={cn(className, "hover:text-white")}
      aria-label={ariaLabel}
    >
      {copied ? <Check className="size-3.5 text-[#9df3dd]" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4 text-center">
      <div className="h-px w-[120px] bg-[linear-gradient(90deg,transparent,rgba(180,200,255,0.5),transparent)] sm:w-[165px]" />
      <h2 className="text-[18px] font-medium tracking-[-0.01em] text-white sm:text-[20px]">
        {title}
      </h2>
      <div className="h-px w-[120px] bg-[linear-gradient(90deg,transparent,rgba(180,200,255,0.5),transparent)] sm:w-[165px]" />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: string;
  tone: StatKey;
}) {
  return (
    <Card
      className="overflow-hidden rounded-xl border-[#c9b896]/70 py-0 shadow-[0_6px_20px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.15)_inset]"
      style={{ background: statCardGradients[tone] }}
    >
      <CardContent className="relative flex min-h-[90px] flex-col justify-center px-4 py-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.9),transparent_28%),radial-gradient(circle_at_80%_110%,rgba(155,132,96,0.15),transparent_34%)] opacity-[0.12]" />
        <div className="relative flex items-start gap-2.5">
          <Image
            src={`/images/badges/${icon}.svg`}
            alt=""
            width={23}
            height={23}
            className="mt-0.5 h-[20px] w-[20px] shrink-0 sm:h-[23px] sm:w-[23px]"
          />
          <div className="min-w-0">
            <p className="text-[14px] leading-none text-[#2a2a2a] sm:text-[15px]">{label}</p>
            <p
              className="mt-2 text-center text-[28px] leading-none font-bold tracking-[-0.03em] sm:text-[32px]"
              style={{ color: STATUS_COLORS[tone] }}
            >
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const SEVERITY_DOT_COLORS: Record<string, string> = {
  Critical: STATUS_COLORS.critical,
  Medium: STATUS_COLORS.medium,
  Minor: STATUS_COLORS.minor,
  Resolved: STATUS_COLORS.resolved,
};

function SeverityBadge({ children }: { children: string }) {
  const dotColor = SEVERITY_DOT_COLORS[children] ?? STATUS_COLORS.minor;
  return (
    <div className="flex items-center gap-1">
      <span
        className="mr-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]"
        style={{ backgroundColor: dotColor }}
      />
      <Badge
        className="h-7 rounded-md border border-[#c9a855]/60 bg-[linear-gradient(180deg,#FFC863_0%,#E5921E_100%)] px-3 text-[13px] font-medium text-[#4a3800] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset]"
      >
        {children}
      </Badge>
    </div>
  );
}

function StatusBadge({ children }: { children: string }) {
  return (
    <Badge className="h-8 rounded-[8px] border bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-4 text-[13px] font-bold text-white">
      {children}
    </Badge>
  );
}

function FindingSummarySeverityPill({ severity }: { severity: string }) {
  const dotColor = SEVERITY_DOT_COLORS[severity] ?? STATUS_COLORS.minor;
  return (
    <Badge className="h-7 rounded-md border-0 bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-3 text-[13px] font-medium text-white">
      <span
        className="mr-1 h-3 w-3 shrink-0 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      {severity}
    </Badge>
  );
}

function FindingStatusPill({ status }: { status: string }) {
  return (
    <Badge className="h-7 rounded-md border-0 bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-3 text-[13px] font-bold text-white">
      {status}
    </Badge>
  );
}

function FindingsTable({ issues }: { issues: AuditReport["issues"] }) {
  return (
    <div className="rounded-[14px] border border-[#4a5a75]/50 bg-[#0A1329] px-3 py-2 backdrop-blur-sm">
      <Table className="overflow-scroll">
        <TableHeader>
          <TableRow className="border-[#4a5a75]/50 hover:bg-transparent">
            <TableHead className="h-8 px-2 text-[14px] font-medium text-white/90">
              <span className="inline-flex items-center gap-0.5">
                Severity
                <ChevronUp className="size-3.5 text-white/60" aria-hidden />
              </span>
            </TableHead>
            <TableHead className="h-8 px-2 text-[14px] font-medium text-white/90">ID</TableHead>
            <TableHead className="h-8 px-2 text-[14px] font-medium text-white/90">Issue Title</TableHead>
            <TableHead className="h-8 px-2 text-right text-[14px] font-medium text-white/90">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} className="border-[#4a5a75]/40 hover:bg-white/5">
              <TableCell className="px-2 py-1">
                <SeverityBadge>{issue.severity}</SeverityBadge>
              </TableCell>
              <TableCell className="px-2 py-1 text-[14px] text-white">{issue.id}</TableCell>
              <TableCell className="px-2 py-1 text-[14px] text-white">{issue.title}</TableCell>
              <TableCell className="px-2 py-1 text-right">
                <StatusBadge>
                  {issue.status ?? "Acknowledged"}
                </StatusBadge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function FindingsBreakdown({ data }: { data: AuditReport }) {
  return (
    <Card className={cn("bg-[#0A1329]", "py-0 relative border-[#4a5a75]/70")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_100%_80%_at_80%_20%,rgba(80,150,255,0.15),transparent_60%)]" />

      <CardHeader className="px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-base font-bold text-white sm:text-xl">
          Findings Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="min-w-0 w-full flex items-start gap-4 rounded-[14px] border border-[#4a5a75]/50 bg-[#0A1329] p-4 backdrop-blur-sm sm:p-6">
            <div className="w-full space-y-2.5">
              <p className="mb-3 text-base font-semibold text-white">Severity Distribution</p>
              {data.legendItems.map((item) => (
                <div key={item.label} className="w-full flex items-center gap-2 text-[15px] text-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[item.tone] }}
                  />
                  <span>{item.label}</span>
                  <span className="ml-auto text-white/70">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-[14px] border border-[#4a5a75]/50 bg-[#0A1329] p-4 backdrop-blur-sm sm:p-6">
            <p className="mb-3 text-base font-semibold text-white">Audit Findings</p>
            <div
              className="max-h-25 space-y-0 overflow-y-auto overscroll-y-contain pr-1 [-webkit-overflow-scrolling:touch] [scrollbar-gutter:stable]"
              role="region"
              aria-label="Audit findings summary list"
            >
              {data.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start gap-2 border-b border-[#4a5a75]/40 px-0 py-2 last:border-b-0 hover:bg-[rgba(30,45,70,0.4)] flex-row sm:items-center justify-between"
                >
                  <FindingSummarySeverityPill severity={issue.severity} />
                  <FindingStatusPill
                    status={issue.status ?? "Acknowledged"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <FindingsTable issues={data.issues} />
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[max-content_1fr_max-content] items-center gap-3 border-b border-[#4a5a75]/40 pb-2 last:border-b-0 last:pb-0">
      <span className="text-[14px] text-white/80">{label}:</span>
      <span className="truncate text-[15px] text-white">{value}</span>
      <CopyIconButton
        text={value}
        ariaLabel={`Copy ${label}`}
        className="h-7 w-7 rounded-[6px] bg-[rgba(90,100,120,0.5)] text-white hover:bg-[rgba(90,100,120,0.7)]"
      />
    </div>
  );
}

const auditPdfDownloadButtonClass =
  "h-14 w-full justify-start rounded-[12px] border-0 bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(30,60,120,0.4)] hover:bg-[linear-gradient(180deg,#325a8a_0%,#224068_100%)]";

function AuditDetailsCard({
  data,
  reportSlug,
}: {
  data: AuditReport;
  reportSlug?: string;
}) {
  const pdfUrl = data.fullReportPdfSrc?.trim();
  const downloadName = reportSlug
    ? `${reportSlug}-audit-report.pdf`
    : "audit-report.pdf";

  const supabaseBase = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  let pdfHref: string | undefined;
  if (pdfUrl) {
    if (
      reportSlug &&
      supabaseBase &&
      parseSupabasePublicObjectUrl(pdfUrl, supabaseBase)
    ) {
      pdfHref = `/api/public/audit-report-pdf/${encodeURIComponent(reportSlug)}`;
    } else {
      pdfHref = pdfUrl;
    }
  }

  return (
    <Card className={cn("bg-[#0A1329]", "py-0 border-[#4a5a75]/70")}>
      <CardHeader className="px-4 pt-4 pb-3 sm:px-5">
        <CardTitle className="text-[15px] font-bold text-white sm:text-[16px]">
          Audit Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-5">
        <div className="space-y-3 rounded-[14px] border border-[#4a5a75]/50 bg-[rgba(25,35,55,0.5)] p-3 backdrop-blur-sm">
          {data.detailRows.map((row) => (
            <DetailRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        {pdfHref ? (
          <Button asChild className={auditPdfDownloadButtonClass}>
            <a
              href={pdfHref}
              download={downloadName}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 size-5" />
              Download Full Report (PDF)
            </a>
          </Button>
        ) : (
          <Button
            type="button"
            disabled
            className={cn(auditPdfDownloadButtonClass, "cursor-not-allowed opacity-45")}
            title="Full PDF has not been uploaded for this report"
          >
            <Download className="mr-2 size-5" />
            Download Full Report (PDF)
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function GlowingProgress({
  value,
  trackClassName,
  fillClassName,
}: {
  value: number;
  trackClassName?: string;
  fillClassName?: string;
}) {
  return (
    <div
      className={cn(
        "h-2.5 overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(8,20,43,0.95)_0%,rgba(14,25,50,0.95)_100%)]",
        trackClassName
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-[linear-gradient(90deg,#7bc8ff_0%,#8ea3ff_52%,#d7defd_100%)] shadow-[0_0_18px_rgba(107,196,255,0.6)]",
          fillClassName
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function BurnedMetricBlock({
  title,
  items,
  footer,
  progressValue = 100,
}: {
  title: string;
  items: Array<{ label: string; value: string; suffix: string; color: string }>;
  footer: string;
  progressValue?: number;
}) {
  return (
    <div className="relative rounded-[18px] border border-[#33476e]/60 p-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-white sm:text-[16px]">{title}</h4>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={`${title}-${item.label}`} className="flex items-center gap-2 text-[14px] text-white/85">
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.2)]"
              style={{ backgroundColor: item.color }}
            />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <span className="shrink-0 text-right text-[14px] font-semibold text-white">
              {item.value} <span className="font-normal text-white/70">{item.suffix}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <GlowingProgress value={progressValue} />
      </div>

      <p className="mt-3 text-[14px] text-white/85">{footer}</p>
    </div>
  );
}

function SupplyRing({
  title,
  value,
  subtitle,
  progress,
}: {
  title: string;
  value: string;
  subtitle: string;
  progress: number;
}) {
  return (
    <div className="flex h-full min-h-[248px] flex-col justify-center ">
      {title ? <p className="text-center text-[15px] text-white/85">{title}</p> : null}

      <div className="relative mx-auto mt-5 h-[210px] w-[210px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: buildRingBackground(progress),
            boxShadow:
              "0 0 30px rgba(96,183,255,0.28), inset 0 0 30px rgba(96,183,255,0.22)",
          }}
        />
        <div className="absolute inset-[11px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(22,46,92,0.8),rgba(4,10,24,0.96)_60%)]" />
        <div className="absolute inset-[20px] rounded-full border border-[#5d7bc5]/30" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_12%_65%,rgba(123,200,255,0.22),transparent_20%),radial-gradient(circle_at_80%_15%,rgba(166,178,255,0.18),transparent_18%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
          <span className="text-[50px] leading-none font-semibold tracking-[-0.04em] text-[#dff6ff]">
            {value}
          </span>
          <span className="mt-2 text-[15px] text-white/80">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

function CirculatingSupplyBlock({
  circulating,
  progressValue,
}: {
  circulating: AuditReport["burnedAmountMetrics"]["circulating"];
  progressValue: number;
}) {
  return (
    <div className="rounded-[18px] border border-[#33476e]/60 bg-[linear-gradient(180deg,rgba(9,16,36,0.96)_0%,rgba(5,10,24,0.92)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_32px_rgba(20,60,140,0.12)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-[15px] font-semibold text-white sm:text-[16px]">Circulating Supply</h4>
        <p className="text-[14px] font-semibold text-[#b7c7ff] sm:text-[15px]">
          {circulating.value}{" "}
          <span className="font-normal text-white/70">{circulating.suffix}</span>
        </p>
      </div>

      <div className="mt-4">
        <GlowingProgress value={progressValue} />
      </div>

      <p className="mt-3 text-[14px] text-white/85">
        {circulating.note}{" "}
        <span className="text-white/70">{circulating.noteSuffix}</span>
      </p>
    </div>
  );
}

function BurnedAmountSection({ data }: { data: AuditReport }) {
  const m = data.burnedAmountMetrics;
  const totalSupplyBurnedPercentage =
    parsePercentage(m.totalSupplyBurned) ??
    resolveMetricPercentage({
      items: m.tokens,
      keywords: ["burned"],
    });
  const burnedTokenPercentage = resolveMetricPercentage({
    items: m.tokens,
    keywords: ["burned"],
    fallbackText: m.totalSupplyBurned,
  });
  const burnedLiquidityPercentage = resolveMetricPercentage({
    items: m.liquidity,
    keywords: ["burned"],
  });
  const circulatingPercentage =
    parsePercentage(m.circulating.suffix) ?? clampPercentage(100 - totalSupplyBurnedPercentage);

  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardHeader className="relative px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Burned Amount
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-4 pb-5 sm:px-5 pt-0">
        <div className={cn("p-3 sm:p-4", "border-none bg-transparent")}>
          <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
            <SupplyRing
              title="Total Tokens Burned"
              value={m.totalSupplyBurned}
              subtitle={m.totalSupplyBurnedLabel}
              progress={totalSupplyBurnedPercentage}
            />

            <div className="grid gap-4">
              <div className="grid gap-4 xl:grid-cols-2">
                <BurnedMetricBlock
                  title="Tokens"
                  items={m.tokens}
                  footer={`${formatPercentage(burnedTokenPercentage)} of Token Supply`}
                  progressValue={burnedTokenPercentage}
                />
                <BurnedMetricBlock
                  title="Liquidity"
                  items={m.liquidity}
                  footer={`${formatPercentage(burnedLiquidityPercentage)} of Liquidity Supply`}
                  progressValue={burnedLiquidityPercentage}
                />
              </div>

              <CirculatingSupplyBlock
                circulating={m.circulating}
                progressValue={circulatingPercentage}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LockersSection({ data }: { data: AuditReport }) {
  const m = data.lockersMetrics;
  const totalTokensLockedPercentage =
    parsePercentage(m.totalTokensLocked) ??
    resolveMetricPercentage({
      items: m.tokens,
      keywords: ["locked"],
    });
  const lockedTokenPercentage = resolveMetricPercentage({
    items: m.tokens,
    keywords: ["locked"],
    fallbackText: m.totalTokensLocked,
  });
  const lockedLiquidityPercentage = resolveMetricPercentage({
    items: m.liquidity,
    keywords: ["locked"],
  });

  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardHeader className="relative px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Lockers
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-4 pb-5 sm:px-5 pt-0">
        <div className={cn("p-3 sm:p-4", "border-none bg-transparent")}>
          <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
            <SupplyRing
              title="Total Tokens Locked"
              value={m.totalTokensLocked}
              subtitle={m.totalTokensLockedLabel}
              progress={totalTokensLockedPercentage}
            />

            <div className="grid gap-4 xl:grid-cols-2">
              <BurnedMetricBlock
                title="Tokens"
                items={m.tokens}
                footer={`${formatPercentage(lockedTokenPercentage)} of Token Supply`}
                progressValue={lockedTokenPercentage}
              />
              <BurnedMetricBlock
                title="Liquidity"
                items={m.liquidity}
                footer={`${formatPercentage(lockedLiquidityPercentage)} of Liquidity Supply`}
                progressValue={lockedLiquidityPercentage}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const securityCheckToneStyles = {
  safe: {
    className:
      "border-[#4e8b84]/70 bg-[linear-gradient(180deg,rgba(72,124,116,0.95)_0%,rgba(47,102,96,0.95)_100%)] text-[#d7fff1]",
    icon: Check,
  },
  review: {
    className:
      "border-[#b68035]/70 bg-[linear-gradient(180deg,rgba(184,131,53,0.95)_0%,rgba(156,101,27,0.95)_100%)] text-[#fff1d5]",
    icon: AlertTriangle,
  },
  missing: {
    className:
      "border-[#9e4760]/70 bg-[linear-gradient(180deg,rgba(161,69,96,0.95)_0%,rgba(126,45,67,0.95)_100%)] text-[#ffe2ec]",
    icon: X,
  },
};

function SecurityCheckBadge({
  status,
  tone,
}: {
  status: string;
  tone: keyof typeof securityCheckToneStyles;
}) {
  const config = securityCheckToneStyles[tone];
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        "h-8 min-w-[88px] justify-center gap-1.5 rounded-[7px] border px-3 text-[13px] font-semibold shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]",
        config.className
      )}
    >
      <Icon className="size-3.5" />
      {status}
    </Badge>
  );
}

function SecurityScorePanel({ metrics }: { metrics: AuditReport["contractSecurityMetrics"] }) {
  const scoreProgress =
    metrics.maxScore > 0 ? clampPercentage((metrics.score / metrics.maxScore) * 100) : 0;

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="grid min-h-full lg:grid-rows-[1fr_auto]">
        <div className="grid gap-6 p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
          <SupplyRing
            title=""
            value={`${metrics.score}`}
            subtitle="Security Rating"
            progress={scoreProgress}
          />

          <div className="flex flex-col justify-center">
            <p className="text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[26px]">
              Security Score
            </p>
            <p className="mt-3 text-[58px] leading-none font-semibold tracking-[-0.05em] text-[#82ccff]">
              {metrics.score}
              <span className="ml-1 text-[28px] font-medium text-white/85">
                /{metrics.maxScore}
              </span>
            </p>
            <p className="mt-5 max-w-[320px] text-[15px] leading-8 text-white/78">
              {metrics.summary}
            </p>
          </div>
        </div>

        <div className="border-t border-[#33476e]/45 bg-[linear-gradient(180deg,rgba(7,13,29,0.08)_0%,rgba(7,13,29,0.32)_100%)] px-5 py-5 text-[15px] text-white/78">
          {metrics.summary}
        </div>
      </div>
    </div>
  );
}

function SecurityChecksPanel({ metrics }: { metrics: AuditReport["contractSecurityMetrics"] }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
          Security Checks
        </h3>

        <div className="mt-5 space-y-0">
          {metrics.checks.map((check) => (
            <div
              key={check.label}
              className="flex items-center justify-between gap-4 border-b border-[#33476e]/45 py-3 last:border-b-0 last:pb-0 first:pt-0"
            >
              <span className="text-[15px] text-white/88 sm:text-[16px]">{check.label}</span>
              <SecurityCheckBadge status={check.status} tone={check.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContractSecurityMetricsSection({ data }: { data: AuditReport }) {
  const m = data.contractSecurityMetrics;
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardHeader className="relative px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Contract Security Metrics
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-4 pb-5 pt-3 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,1fr)]">
          <SecurityScorePanel metrics={m} />
          <SecurityChecksPanel metrics={m} />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoPanelRow({
  label,
  value,
  actionLabel,
}: {
  label: string;
  value: string;
  actionLabel?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-3 border-b border-[#33476e]/45 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <div className="grid min-w-0 grid-cols-[minmax(110px,1fr)_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[150px_minmax(0,1fr)]">
        <span className="text-[15px] text-white/78 sm:text-[16px]">{label}</span>
        <span className="truncate text-right text-[15px] font-semibold text-white sm:text-[16px]">
          {value}
        </span>
      </div>

      {actionLabel ? (
        <CopyIconButton
          text={value}
          ariaLabel={actionLabel}
          className="h-8 w-8 rounded-[8px] border border-[#6776a7]/60 bg-[linear-gradient(180deg,rgba(48,57,92,0.92)_0%,rgba(34,42,74,0.92)_100%)] text-white/90 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] hover:bg-[linear-gradient(180deg,rgba(58,68,106,0.96)_0%,rgba(40,49,86,0.96)_100%)]"
        />
      ) : null}
    </div>
  );
}

function InformationPanel({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string; actionLabel?: string }>;
}) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative">
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
          {title}
        </h3>

        <div className="mt-4">
          {rows.map((row) => (
            <InfoPanelRow key={row.label} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContractInformationSection({ data }: { data: AuditReport }) {
  const info = data.contractInformation;
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardHeader className="relative px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Contract Information
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-4 pb-5 pt-3 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <InformationPanel title="Token Details" rows={info.tokenDetails} />
          <InformationPanel
            title="Deployment Details"
            rows={info.deploymentDetails}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function HolderLegendRow({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: string;
  suffix: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 text-[15px] text-white/84">
      <span
        className="h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.18)]"
        style={{ backgroundColor: color }}
      />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="shrink-0 text-right font-semibold text-white">
        {value} <span className="font-normal text-white/78">{suffix}</span>
      </span>
    </div>
  );
}

function OwnershipPrivilegesPanel({
  risk,
  totalSupplyAmount,
}: {
  risk: AuditReport["ownershipAndLiquidityRisk"];
  totalSupplyAmount: number | null;
}) {
  const oc = risk.ownerControl;
  const ownerControlPercentage =
    sumHolderPercentages(oc.holders, totalSupplyAmount) ??
    resolvePercentageFromSources([oc.value], oc.progress);
  const ownerControlValue = formatPercentage(ownerControlPercentage);

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="grid min-h-full lg:grid-rows-[1fr_auto]">
        <div className="grid gap-6 p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
          <SupplyRing
            title=""
            value={ownerControlValue}
            subtitle={oc.subtitle}
            progress={ownerControlPercentage}
          />

          <div className="flex flex-col justify-center">
            <p className="text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[26px]">
              Top Holders
            </p>

            <div className="mt-5 space-y-4">
              {oc.holders.map((holder) => (
                <HolderLegendRow key={holder.label} {...holder} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#33476e]/45 bg-[linear-gradient(180deg,rgba(7,13,29,0.08)_0%,rgba(7,13,29,0.32)_100%)] px-5 py-5">
          <div className="flex items-start gap-3 rounded-[14px] border border-[#5b3440]/55 bg-[linear-gradient(180deg,rgba(39,16,26,0.55)_0%,rgba(23,10,16,0.55)_100%)] px-4 py-4">
            <div className="mt-0.5 rounded-full bg-[rgba(255,136,99,0.12)] p-1.5 text-[#ff9b72]">
              <AlertTriangle className="size-5" />
            </div>
            <p className="text-[15px] leading-7 text-white/82">
              {oc.warning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiquidityRiskDetailPanel({
  risk,
}: {
  risk: AuditReport["ownershipAndLiquidityRisk"];
}) {
  const lh = risk.liquidityHolder;
  const liquidityHolderPercentage = resolvePercentageFromSources(
    [lh.footerValue, lh.footerLabel],
    lh.progress
  );

  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

        <div className="relative">
          <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
            {lh.title}
          </h3>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#33476e]/45 pt-4">
            <span className="text-[18px] text-white/88">
              {lh.holder}
            </span>
            <div className="inline-flex items-center gap-1 rounded-[9px] border border-[#4b4b95]/60 bg-[linear-gradient(180deg,rgba(55,56,118,0.9)_0%,rgba(34,35,84,0.9)_100%)] px-3 py-1 text-[13px] font-semibold text-[#b8c6ff]">
              <span>{lh.chipPrimary}</span>
              <span className="text-white/70">
                {lh.chipSecondary}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <GlowingProgress value={liquidityHolderPercentage} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-white/72">
              {lh.footerLabel}
            </span>
            <span className="font-semibold text-white">
              {formatPercentage(liquidityHolderPercentage)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

        <div className="relative">
          <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
            {risk.lockedLiquidity.title}
          </h3>

          <div className="mt-5 border-t border-[#33476e]/45 pt-4">
            <div className="flex items-center justify-between gap-3 text-[18px] font-medium text-white/88">
              <span>{risk.lockedLiquidity.leftValue}</span>
              <span>{risk.lockedLiquidity.rightValue}</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
              <span className="text-white/72">
                {risk.lockedLiquidity.subLabel}
              </span>
              <span className="font-semibold text-white">
                {risk.lockedLiquidity.rightPercent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OwnershipAndPrivilegesSection({ data }: { data: AuditReport }) {
  const risk = data.ownershipAndLiquidityRisk;
  const totalSupplyAmount = resolveTotalSupplyAmount(data);
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardContent className="relative px-4 py-5 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.72fr)]">
          <div className="space-y-4">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
              Ownership & Privileges
            </h2>
            <OwnershipPrivilegesPanel risk={risk} totalSupplyAmount={totalSupplyAmount} />
          </div>

          <div className="space-y-4">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
              Liquidity Risk
            </h2>
            <LiquidityRiskDetailPanel risk={risk} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DistributionLegendRow({
  label,
  value,
  color,
  active,
}: {
  label: string;
  value: string;
  color: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#33476e]/40 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <span
        className={cn(
          "h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.18)]",
          active ? "ring-2 ring-[#65d9ff]/30 ring-offset-2 ring-offset-transparent" : ""
        )}
        style={{ backgroundColor: color }}
      />
      <span className="min-w-0 flex-1 text-[15px] text-white/84 sm:text-[16px]">{label}</span>
      <span className="shrink-0 text-[15px] font-semibold text-white sm:text-[16px]">{value}</span>
    </div>
  );
}

function HolderDistributionPanel({
  analysis,
}: {
  analysis: AuditReport["holderDistributionAnalysis"];
}) {
  const scorePercentage = resolvePercentageFromSources(
    [analysis.score.value],
    analysis.score.progress
  );
  const whaleCategoryPercentage =
    resolveActiveSharePercentage(analysis.whaleCategory.rows) ??
    resolvePercentageFromSources(
      [analysis.whaleCategory.value, analysis.score.value],
      analysis.whaleCategory.progress
    );

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="grid min-h-full lg:grid-rows-[1fr_auto]">
        <div className="grid gap-6 p-5 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
          <SupplyRing
            title=""
            value={formatPercentage(scorePercentage)}
            subtitle={analysis.score.subtitle}
            progress={scorePercentage}
          />

          <div className="flex flex-col justify-center">
            <div className="flex items-end justify-between gap-3">
              <h3 className="text-[26px] font-semibold tracking-[-0.03em] text-white sm:text-[28px]">
                {analysis.whaleCategory.title}
              </h3>
              <span className="text-[22px] font-semibold text-white">
                {formatPercentage(whaleCategoryPercentage)}
              </span>
            </div>

            <div className="mt-3">
              <GlowingProgress value={whaleCategoryPercentage} />
            </div>

            <div className="mt-4">
              {analysis.whaleCategory.rows.map((row) => (
                <DistributionLegendRow key={row.label} {...row} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#33476e]/45 bg-[linear-gradient(180deg,rgba(7,13,29,0.08)_0%,rgba(7,13,29,0.32)_100%)] px-5 py-5 text-[15px] text-white/78">
          {analysis.note}
        </div>
      </div>
    </div>
  );
}

function CompactLiquidityRiskPanel({
  analysis,
}: {
  analysis: AuditReport["holderDistributionAnalysis"];
}) {
  const lr = analysis.liquidityRisk;
  const liquidityRiskPercentage = resolvePercentageFromSources([lr.score], lr.progress);
  const bottomSharePercentage = resolvePercentageFromSources([lr.bottomShare]);

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Liquidity Risk
        </h3>

        <div className="mt-5 rounded-[16px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(6,13,30,0.45)_0%,rgba(6,13,30,0.2)_100%)] p-4">
          <div className="grid gap-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center">
            <div className="flex justify-center">
              <div className="relative h-[112px] w-[112px]">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: buildRingBackground(liquidityRiskPercentage),
                    boxShadow:
                      "0 0 22px rgba(96,183,255,0.26), inset 0 0 18px rgba(96,183,255,0.18)",
                  }}
                />
                <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(22,46,92,0.8),rgba(4,10,24,0.96)_60%)]" />
                <div className="absolute inset-[15px] rounded-full border border-[#5d7bc5]/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] text-[#dff6ff]">
                    {lr.score}
                  </span>
                  <span className="mt-1 text-[12px] text-white/78">
                    {lr.subtitle}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[16px] font-medium text-white/88">
                {lr.holder}
              </div>
              <div className="rounded-[10px] border border-[#33476e]/55 bg-[rgba(10,18,40,0.6)] px-3 py-2">
                <GlowingProgress value={liquidityRiskPercentage} />
              </div>
              <div className="text-[15px] text-white/75">
                {lr.primaryValue}
              </div>
              <div className="inline-flex rounded-[9px] border border-[#4d3f70]/55 bg-[linear-gradient(180deg,rgba(58,45,90,0.88)_0%,rgba(38,29,60,0.88)_100%)] px-3 py-1 text-[13px] font-medium text-[#d8d0ff]">
                {lr.secondaryValue}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-[#33476e]/45 pt-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(30,69,150,0.95)_0%,rgba(19,41,97,0.95)_100%)] text-[15px] font-semibold text-white shadow-[0_0_18px_rgba(74,148,255,0.25)]">
              α
            </div>
            <span className="text-[15px] font-semibold text-white">
              {lr.bottomShare}
            </span>
            <div className="min-w-0 flex-1">
              <GlowingProgress
                value={bottomSharePercentage}
                trackClassName="h-2"
                fillClassName="bg-[linear-gradient(90deg,#ffffff_0%,#dfe8ff_100%)] shadow-none"
              />
            </div>
            <span className="text-[14px] text-white/74">
              {lr.bottomAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HolderDistributionAnalysisSection({ data }: { data: AuditReport }) {
  const analysis = data.holderDistributionAnalysis;
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardHeader className="relative px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Holder Distribution Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-4 pb-5 pt-3 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.52fr)_minmax(290px,0.68fr)]">
          <HolderDistributionPanel analysis={analysis} />
          <CompactLiquidityRiskPanel analysis={analysis} />
        </div>
      </CardContent>
    </Card>
  );
}

function TaxProgressRow({
  label,
  value,
  progress,
  fillClassName,
}: {
  label: string;
  value: string;
  progress: number;
  fillClassName?: string;
}) {
  const displayProgress = resolvePercentageFromSources([value], progress);

  return (
    <div className="grid grid-cols-[104px_minmax(0,1fr)_52px] items-center gap-4 sm:grid-cols-[110px_minmax(0,1fr)_64px]">
      <span className="text-[16px] text-white/88 sm:text-[17px]">{label}</span>
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <GlowingProgress value={displayProgress} fillClassName={fillClassName} />
        </div>
        <span className="shrink-0 text-[14px] font-medium text-white/85">{value}</span>
      </div>
      <span className="text-right text-[16px] font-medium text-white/88">{value}</span>
    </div>
  );
}

function TaxBreakdownGrid({ taxAnalysis }: { taxAnalysis: AuditReport["transactionTaxAnalysis"] }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#33476e]/55">
      <div className="grid grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)] bg-[linear-gradient(180deg,rgba(8,15,34,0.4)_0%,rgba(8,15,34,0.18)_100%)]">
        <div className="border-r border-[#33476e]/45 px-4 py-3 text-[15px] font-semibold text-white/86">
          Tax Breakdown
        </div>
        <div className="border-r border-[#33476e]/45 px-4 py-3 text-[15px] font-semibold text-white">
          Buy
        </div>
        <div className="px-4 py-3 text-[15px] font-semibold text-white">Sell</div>

        {taxAnalysis.breakdownRows.map((row) => (
          <Fragment key={`${row.taxValue}-${row.buyLabel}-${row.sellLabel}`}>
            <div className="flex items-center gap-2 border-t border-r border-[#33476e]/45 px-4 py-3">
              <span className="text-[15px] text-white/82">{row.tax}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[linear-gradient(180deg,#24d7ff_0%,#138db4_100%)] text-[#d7feff] shadow-[0_0_14px_rgba(36,215,255,0.28)]">
                <Check className="size-3.5" />
              </span>
              <span className="text-[15px] font-medium text-white">{row.taxValue}</span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-r border-[#33476e]/45 px-4 py-3">
              <span className="max-w-[120px] text-[12px] leading-4 text-white/68">{row.buyLabel}</span>
              <span className="shrink-0 text-[15px] font-medium text-white">{row.buyValue}</span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#33476e]/45 px-4 py-3">
              <span className="max-w-[120px] text-[12px] leading-4 text-white/68">{row.sellLabel}</span>
              <span className="shrink-0 text-[15px] font-medium text-white">{row.sellValue}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function TransactionTaxPanel({ taxAnalysis }: { taxAnalysis: AuditReport["transactionTaxAnalysis"] }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <div className="space-y-6">
          {taxAnalysis.taxes.map((tax) => (
            <TaxProgressRow key={tax.label} {...tax} />
          ))}
        </div>

        <div className="mt-6">
          <TaxBreakdownGrid taxAnalysis={taxAnalysis} />
        </div>

        <p className="mt-5 text-[15px] leading-7 text-white/78">
          {taxAnalysis.note}
        </p>
      </div>
    </div>
  );
}

function TaxLiquidityRiskPanel({ taxAnalysis }: { taxAnalysis: AuditReport["transactionTaxAnalysis"] }) {
  const risk = taxAnalysis.liquidityRisk;
  const liquidityRiskPercentage = resolvePercentageFromSources(
    [risk.footerValue, risk.footerLabel],
    risk.progress
  );

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          {risk.title}
        </h3>

        <div className="mt-5 rounded-[16px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(6,13,30,0.45)_0%,rgba(6,13,30,0.2)_100%)] p-4">
          <h4 className="text-[18px] font-medium text-white/88">{risk.topHolderTitle}</h4>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#33476e]/45 pt-4">
            <span className="text-[16px] font-medium text-white/88">{risk.holder}</span>
            <div className="inline-flex rounded-[9px] border border-[#4d3f70]/55 bg-[linear-gradient(180deg,rgba(58,45,90,0.88)_0%,rgba(38,29,60,0.88)_100%)] px-3 py-1 text-[13px] font-medium text-[#d8d0ff]">
              {risk.chipValue}
            </div>
          </div>

          <div className="mt-4">
            <GlowingProgress value={liquidityRiskPercentage} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-white/72">{risk.footerLabel}</span>
            <span className="font-semibold text-white">{formatPercentage(liquidityRiskPercentage)}</span>
          </div>

          <div className="mt-6 border-t border-[#33476e]/45 pt-5">
            <h4 className="text-[18px] font-medium text-white/88">{risk.lockedTitle}</h4>

            <div className="mt-4 flex items-center justify-between gap-3 text-[18px] font-medium text-white/88">
              <span>{risk.lockedLeftValue}</span>
              <span>{risk.lockedRightValue}</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
              <span className="text-white/72">{risk.lockedSubLabel}</span>
              <span className="font-semibold text-white">{risk.lockedPercent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionTaxAnalysisSection({ data }: { data: AuditReport }) {
  const taxAnalysis = data.transactionTaxAnalysis;
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardHeader className="relative px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Transaction Tax Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-4 pb-5 pt-3 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.42fr)_minmax(300px,0.78fr)]">
          <TransactionTaxPanel taxAnalysis={taxAnalysis} />
          <TaxLiquidityRiskPanel taxAnalysis={taxAnalysis} />
        </div>
      </CardContent>
    </Card>
  );
}

function DetectionCheckRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-[15px] text-white/82">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#204a63_0%,#12313f_100%)] text-[#9df3dd] shadow-[0_0_14px_rgba(76,209,173,0.18)]">
        <Check className="size-3.5" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function HoneypotDetectionPanel({ section }: { section: AuditReport["honeypotAndAntiWhale"]["honeypot"] }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Honeypot Detection
        </h3>

        <div className="mt-5 rounded-[16px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(6,13,30,0.45)_0%,rgba(6,13,30,0.2)_100%)] p-4">
          <div className="grid gap-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:items-center">
            <div className="flex justify-center">
              <div className="relative flex h-[96px] w-[96px] items-center justify-center rounded-[24px] border border-[#3c5f94]/50 bg-[radial-gradient(circle_at_50%_20%,rgba(98,178,255,0.22),rgba(12,22,48,0.92)_70%)] shadow-[0_0_26px_rgba(83,151,255,0.18)]">
                <Shield className="size-14 text-[#8ec9ff] drop-shadow-[0_0_18px_rgba(96,183,255,0.35)]" strokeWidth={1.8} />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center rounded-[10px] border border-[#416f66]/55 bg-[linear-gradient(180deg,rgba(33,76,72,0.88)_0%,rgba(21,52,49,0.88)_100%)] px-4 py-3 text-[18px] font-medium text-[#dffef3] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
                {section.status}
              </div>

              <div className="mt-4 space-y-3">
                {section.checks.map((item) => (
                  <DetectionCheckRow key={item} label={item} />
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-[14px] text-white/72">
            {section.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function AntiWhaleMechanismPanel({
  section,
  totalSupplyAmount,
}: {
  section: AuditReport["honeypotAndAntiWhale"]["antiWhale"];
  totalSupplyAmount: number | null;
}) {
  const antiWhalePercentage =
    resolveItemSharePercentage(section.ringValue, totalSupplyAmount) ??
    resolvePercentageFromSources([section.footerRight, section.footerLeft], section.progress);

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
          Anti-Whale Mechanism
        </h3>

        <div className="mt-5 rounded-[16px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(6,13,30,0.45)_0%,rgba(6,13,30,0.2)_100%)] p-4">
          <div className="grid gap-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center">
            <div className="flex justify-center">
              <div className="relative h-[112px] w-[112px]">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: buildRingBackground(antiWhalePercentage),
                    boxShadow:
                      "0 0 22px rgba(96,183,255,0.26), inset 0 0 18px rgba(96,183,255,0.18)",
                  }}
                />
                <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(22,46,92,0.8),rgba(4,10,24,0.96)_60%)]" />
                <div className="absolute inset-[15px] rounded-full border border-[#5d7bc5]/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] text-[#dff6ff]">
                    {section.ringValue}
                  </span>
                  <span className="mt-1 text-[12px] text-white/78">
                    {section.ringSubtitle}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[16px] font-semibold text-white/92">
                {section.title}
              </div>
              <div className="mt-1 text-[13px] text-white/66">
                {section.subLabel}
              </div>

              <div className="mt-4">
                <GlowingProgress value={antiWhalePercentage} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
                <span className="text-white/72">{`${formatPercentage(antiWhalePercentage)} of Total Supply`}</span>
                <span className="font-semibold text-white">{formatPercentage(antiWhalePercentage)}</span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
                <span className="font-medium text-white/84">{section.baseValue}</span>
                <span className="text-white/55">{section.baseSubLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[16px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(6,13,30,0.45)_0%,rgba(6,13,30,0.2)_100%)] p-4">
          <div className="space-y-3">
            {section.statRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,1fr)_72px_88px] items-center gap-3 border-b border-[#33476e]/40 pb-3 last:border-b-0 last:pb-0"
              >
                <span className="text-[15px] text-white/82">{row.label}</span>
                <span className="text-right text-[15px] font-medium text-white">{row.value}</span>
                <Badge className="h-7 justify-center rounded-[7px] border border-[#4e8b84]/65 bg-[linear-gradient(180deg,rgba(72,124,116,0.95)_0%,rgba(47,102,96,0.95)_100%)] px-3 text-[13px] font-semibold text-[#d7fff1]">
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[13px] leading-6 text-white/68">
            {section.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function HoneypotAndAntiWhaleSection({ data }: { data: AuditReport }) {
  const h = data.honeypotAndAntiWhale;
  const totalSupplyAmount = resolveTotalSupplyAmount(data);
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardContent className="relative px-4 py-5 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(340px,1fr)]">
          <HoneypotDetectionPanel section={h.honeypot} />
          <AntiWhaleMechanismPanel
            section={h.antiWhale}
            totalSupplyAmount={totalSupplyAmount}
          />
        </div>
      </CardContent>
    </Card>
  );
}

const PROJECT_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Globe,
  Hexagon,
  Link2,
  Zap,
  CalendarDays,
};

function ProjectActionButton({
  label,
  icon: iconName,
  href,
}: {
  label: string;
  icon?: string;
  href?: string;
}) {
  const ResolvedIcon = (iconName ? PROJECT_ICON_MAP[iconName] : undefined) ?? Globe;
  const className =
    "inline-flex h-11 items-center rounded-[12px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(9,16,36,0.86)_0%,rgba(5,10,24,0.78)_100%)] px-4 text-[16px] font-medium text-white/88 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] transition-colors hover:bg-[linear-gradient(180deg,rgba(14,22,46,0.9)_0%,rgba(8,14,30,0.84)_100%)]";
  const content = (
    <>
      <ResolvedIcon className="mr-2 size-4.5 text-[#74c6ff]" />
      {label}
    </>
  );
  const url = href?.trim();
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Button type="button" variant="ghost" className={className}>
      {content}
    </Button>
  );
}

function ProjectFeatureBadge({
  label,
  icon: iconName,
  tone,
}: {
  label: string;
  icon?: string;
  tone: "amber" | "indigo" | "blue";
}) {
  const ResolvedIcon = (iconName ? PROJECT_ICON_MAP[iconName] : undefined) ?? Hexagon;
  const toneMap = {
    amber: "text-[#f0b45b]",
    indigo: "text-[#7e8dff]",
    blue: "text-[#53b9ff]",
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-[12px] border border-[#33476e]/50 bg-[linear-gradient(180deg,rgba(9,16,36,0.82)_0%,rgba(5,10,24,0.72)_100%)] px-4 py-3 text-[15px] font-medium text-white/88">
      <ResolvedIcon className={cn("size-4.5 shrink-0", toneMap[tone])} />
      <span>{label}</span>
    </div>
  );
}

function ProjectOverviewSection({
  data,
  brand,
}: {
  data: AuditReport;
  brand: ResolvedAuditBrand;
}) {
  const overview = data.projectOverview;
  return (
    <Card className={cn("relative overflow-hidden bg-[#050d1e] py-0 border-[#33476e]/80 gap-0")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(121,161,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(121,161,255,0.22)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url("${SURFACE_NOISE_TEXTURE}")`,
          backgroundSize: "180px 180px",
        }}
      />

      <CardContent className="relative px-4 py-5 sm:px-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_280px] lg:items-stretch">
          <div className="rounded-[18px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(7,13,29,0.45)_0%,rgba(7,13,29,0.22)_100%)] p-5">
            <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-white sm:text-[32px]">
              {overview.title}
            </h2>

            <div className="mt-3 inline-flex items-center gap-2 text-[16px] text-white/72">
              <Globe className="size-4.5 text-[#74c6ff]" />
              <span>{overview.website}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {overview.actions.map((action, i) => (
                <ProjectActionButton
                  key={`${i}-${action.label}`}
                  {...action}
                />
              ))}
            </div>

            <p className="mt-7 max-w-3xl text-[18px] leading-9 text-white/82 sm:text-[19px]">
              {overview.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {overview.badges.map((badge) => (
                <ProjectFeatureBadge key={badge.label} {...badge} />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 text-[16px] text-white/70">
              <CalendarDays className="size-4.5 text-white/55" />
              <span>
                Onboarded: <span className="text-white/88">{overview.onboarded}</span>
              </span>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(7,13,29,0.45)_0%,rgba(7,13,29,0.22)_100%)] p-5">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <BrandLogoImage
                src={brand.logoSrc}
                alt={brand.name}
                width={220}
                height={220}
                className="h-auto w-[180px] filter-[drop-shadow(0_0_30px_rgba(80,150,255,0.35))] sm:w-[220px]"
              />

              <div className="mt-4 text-[34px] font-semibold tracking-[-0.05em] text-[#7fc7ff] sm:text-[40px]">
                {brand.name}
              </div>

              <div className="mt-6 inline-flex items-center gap-3 rounded-[14px] border border-[#3b5fa0]/60 bg-[linear-gradient(180deg,rgba(14,30,64,0.95)_0%,rgba(8,18,40,0.92)_100%)] px-5 py-3 text-left shadow-[0_0_24px_rgba(62,138,255,0.18),0_1px_0_rgba(255,255,255,0.08)_inset]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(98,178,255,0.25),rgba(12,22,48,0.92)_72%)] text-[#8ec9ff]">
                  <Shield className="size-5" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-white/92">
                    {overview.verifiedLabel}
                  </div>
                  <div className="text-[12px] tracking-[0.18em] text-[#6fc2ff] uppercase">
                    {brand.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface AuditSummaryProps {
  data?: AuditReport;
  /** Used for the PDF download filename on the public audit page. */
  reportSlug?: string;
}

export function AuditSummary({
  data = defaultAuditReport,
  reportSlug,
}: AuditSummaryProps) {
  const brand = resolveAuditBrand(data);
  return (
    <main className="max-w-6xl mx-auto relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0a1525_0%,#0d1b2e_30%,#0a1525_100%)]">
      {/* Radial gradient - lighter at top center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(30,60,120,0.25),transparent_50%)]" />
      {/* Network / geometric grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,150,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,150,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glowing streaks around logo area */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_60%_80%_at_50%_20%,rgba(80,150,255,0.15),transparent_60%)]" />
      {/* Divider under header */}
      <div className="pointer-events-none absolute inset-x-0 top-[200px] h-px bg-[linear-gradient(90deg,transparent,rgba(180,200,255,0.3),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-6 pb-12 sm:px-8">
        <header className="flex flex-col items-center">
          <div className="relative">
            <BrandLogoImage
              src={brand.logoSrc}
              alt=""
              width={183}
              height={164}
              priority
              className="h-auto w-[200px] sm:w-[164px] filter-[drop-shadow(0_0_20px_rgba(80,150,255,0.6))]"
            />
          </div>
          <h1
            className="mt-2 text-center text-[22px] font-bold tracking-tight sm:text-[24px]"
            style={{
              color: "#7eb8ff",
              textShadow: "0 0 24px rgba(100,180,255,0.7)",
            }}
          >
            {brand.name}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <div className="h-px w-8 bg-white/30" />
            <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-white/80 sm:text-[13px]">
              Blockchain Security & Audit
            </p>
            <div className="h-px w-8 bg-white/30" />
          </div>
          <div className="mt-4">
            <SectionHeading title="Smart Contract Audit Summary" />
          </div>
        </header>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {data.summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </section>

        <section className="mt-4 flex flex-col gap-4 md:grid lg:grid-cols-[minmax(0,1fr)_364px]">
          <FindingsBreakdown data={data} />
          <AuditDetailsCard data={data} reportSlug={reportSlug} />
        </section>

        <section className="mt-4">
          <BurnedAmountSection data={data} />
        </section>

        <section className="mt-4">
          <LockersSection data={data} />
        </section>

        <section className="mt-4">
          <ContractSecurityMetricsSection data={data} />
        </section>

        <section className="mt-4">
          <ContractInformationSection data={data} />
        </section>

        <section className="mt-4">
          <OwnershipAndPrivilegesSection data={data} />
        </section>

        <section className="mt-4">
          <HolderDistributionAnalysisSection data={data} />
        </section>

        <section className="mt-4">
          <TransactionTaxAnalysisSection data={data} />
        </section>

        <section className="mt-4">
          <HoneypotAndAntiWhaleSection data={data} />
        </section>

        <section className="mt-4">
          <ProjectOverviewSection data={data} brand={brand} />
        </section>
      </div>
    </main>
  );
}
