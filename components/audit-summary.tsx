"use client";

import Image from "next/image";
import { ChevronUp, Copy, Download } from "lucide-react";

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
import { cn } from "@/lib/utils";

type StatKey = "total" | "critical" | "medium" | "minor" | "resolved";

const STATUS_COLORS: Record<StatKey, string> = {
  total: "#2D3A53",
  critical: "#d94d43",
  medium: "#e5a54b",
  minor: "#3d8fe8",
  resolved: "#1da564",
};

const summaryCards = [
  { label: "Total Findings", value: 3, icon: "findings", tone: "total" as StatKey },
  { label: "Critical", value: 0, icon: "critical", tone: "critical" as StatKey },
  { label: "Medium", value: 0, icon: "medium", tone: "medium" as StatKey },
  { label: "Minor", value: 3, icon: "minor", tone: "minor" as StatKey },
  { label: "Resolved", value: 0, icon: "resolved", tone: "resolved" as StatKey },
];

const legendItems = [
  { label: "Critical", count: 0, tone: "critical" as StatKey },
  { label: "Medium", count: 0, tone: "medium" as StatKey },
  { label: "Minor", count: 3, tone: "minor" as StatKey },
];

const issues = [
  { id: "NWES", title: "ERC-20 Standard Noncompliance", severity: "Minor" },
  { id: "MC", title: "Missing Validation Check", severity: "Minor" },
  { id: "L19", title: "Compiler Version Not Pinned", severity: "Minor" },
];

const detailRows = [
  { label: "Network", value: "Binance Smart Chain" },
  { label: "Contract", value: "0x315e...c2bf" },
  { label: "File Audited", value: "LFUSDcoin.sol" },
  { label: "SHA256", value: "d0955f...fc8eb" },
  { label: "Audit Date", value: "March 2026" },
];

const burnedAmountMetrics = {
  totalSupplyBurned: "0.1%",
  totalSupplyBurnedLabel: "of Total Supply",
  tokens: [
    { label: "Tokens", value: "49.4B", suffix: "(100% supply)", color: "#8b98ff" },
    { label: "Burned Tokens", value: "0", suffix: "(0% supply)", color: "#cab7ff" },
  ],
  liquidity: [
    { label: "Tokens", value: "5", suffix: "(0% supply)", color: "#efc18f" },
    { label: "Tokens Burned", value: "0", suffix: "(0% supply)", color: "#f5f0dc" },
  ],
  circulating: {
    value: "49.4B",
    suffix: "(99.9% supply)",
    note: "Burned 0",
    noteSuffix: "(0.1% supply)",
  },
};

const lockersMetrics = {
  totalTokensLocked: "20.2%",
  totalTokensLockedLabel: "of Circ. Supply",
  tokens: [
    { label: "Tokens", value: "49.4B", suffix: "(100% supply)", color: "#8b98ff" },
    { label: "Locked Tokens", value: "10B", suffix: "(20.2% supply)", color: "#57a9ff" },
  ],
  liquidity: [
    { label: "Tokens", value: "5", suffix: "(0% supply)", color: "#efc18f" },
    { label: "Locked Tokens", value: "0", suffix: "(0% supply)", color: "#f5f0dc" },
  ],
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
};

function SeverityBadge({ children }: { children: string }) {
  const dotColor = SEVERITY_DOT_COLORS[children] ?? STATUS_COLORS.minor;
  return (
    <div className="flex items-center gap-1">
      <span className="mr-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#FFA938] shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]" />
      <Badge
        className="h-7 rounded-md border border-[#c9a855]/60 bg-[linear-gradient(180deg,#FFC863_0%,#E5921E_100%)] px-3 text-[13px] font-medium text-[#4a3800] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset]"
      >

        {children}
      </Badge>
    </div>
  );
}

function StatusBadge() {
  return (
    <Badge className="h-8 rounded-[8px] border bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-4 text-[13px] font-bold text-white">
      Acknowledged
    </Badge>
  );
}

function MinorPillBadge() {
  return (
    <Badge className="h-7 rounded-md border-0 bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-3 text-[13px] font-medium text-white">
      <span className="bg-[#3d8fe8] w-3 h-3 shrink-0 rounded-full mr-1"></span>
      Minor
    </Badge>
  );
}

function AcknowledgedPillBadge() {
  return (
    <Badge className="h-7 rounded-md border-0 bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-3 text-[13px] font-bold text-white">
      Acknowledged
    </Badge>
  );
}

function FindingsTable() {
  return (
    <div className="rounded-[14px] border border-[#4a5a75]/50 bg-[#0A1329] px-3 py-2 backdrop-blur-sm">
      <Table>
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
                <StatusBadge />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function FindingsBreakdown() {
  return (
    <Card className={cn("bg-[#0A1329]", "py-0 relative border-[#4a5a75]/70")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_100%_80%_at_80%_20%,rgba(80,150,255,0.15),transparent_60%)]" />

      <CardHeader className="px-4 pt-4 pb-0 sm:px-5">
        <CardTitle className="text-base font-bold text-white sm:text-xl">
          Findings Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="w-full flex items-start gap-4 rounded-[14px] border border-[#4a5a75]/50 bg-[#0A1329] p-6 backdrop-blur-sm">
            <div className="w-full space-y-2.5">
              <p className="mb-3 text-base font-semibold text-white">Severity Distribution</p>
              {legendItems.map((item) => (
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

          <div className="rounded-[14px] border border-[#4a5a75]/50 bg-[#0A1329] p-6 backdrop-blur-sm">
            <p className="mb-3 text-base font-semibold text-white">Audit Findings</p>
            <div className="space-y-0">
              {issues.slice(0, 2).map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between border-b border-[#4a5a75]/40 hover:bg-[rgba(30,45,70,0.4)] px-0 py-1"
                >
                  <MinorPillBadge />
                  <AcknowledgedPillBadge />
                </div>
              ))}
            </div>
          </div>
        </div>

        <FindingsTable />
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch { }
  };

  return (
    <div className="grid grid-cols-[max-content_1fr_max-content] items-center gap-3 border-b border-[#4a5a75]/40 pb-2 last:border-b-0 last:pb-0">
      <span className="text-[14px] text-white/80">{label}:</span>
      <span className="truncate text-[15px] text-white">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        className="h-7 w-7 rounded-[6px] bg-[rgba(90,100,120,0.5)] text-white hover:bg-[rgba(90,100,120,0.7)]"
        aria-label={`Copy ${label}`}
      >
        <Copy className="size-3.5" />
      </Button>
    </div>
  );
}

function AuditDetailsCard() {
  return (
    <Card className={cn("bg-[#0A1329]", "py-0 border-[#4a5a75]/70")}>
      <CardHeader className="px-4 pt-4 pb-3 sm:px-5">
        <CardTitle className="text-[15px] font-bold text-white sm:text-[16px]">
          Audit Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-5">
        <div className="space-y-3 rounded-[14px] border border-[#4a5a75]/50 bg-[rgba(25,35,55,0.5)] p-3 backdrop-blur-sm">
          {detailRows.map((row) => (
            <DetailRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        <Button
          className="h-14 w-full justify-start rounded-[12px] border-0 bg-[linear-gradient(180deg,#2a4a7a_0%,#0E2857_100%)] px-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(30,60,120,0.4)] hover:bg-[linear-gradient(180deg,#325a8a_0%,#224068_100%)]"
        >
          <Download className="mr-2 size-5" />
          Download Full Report (PDF)
        </Button>
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
      <p className="text-center text-[15px] text-white/85">{title}</p>

      <div className="relative mx-auto mt-5 h-[210px] w-[210px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 220deg, rgba(117,204,255,1) 0deg, rgba(112,141,255,1) ${progress * 3.6}deg, rgba(210,223,255,0.95) ${progress * 3.6}deg, rgba(210,223,255,0.95) 360deg)`,
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

function CirculatingSupplyBlock() {
  return (
    <div className="rounded-[18px] border border-[#33476e]/60 bg-[linear-gradient(180deg,rgba(9,16,36,0.96)_0%,rgba(5,10,24,0.92)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_32px_rgba(20,60,140,0.12)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-[15px] font-semibold text-white sm:text-[16px]">Circulating Supply</h4>
        <p className="text-[14px] font-semibold text-[#b7c7ff] sm:text-[15px]">
          {burnedAmountMetrics.circulating.value}{" "}
          <span className="font-normal text-white/70">{burnedAmountMetrics.circulating.suffix}</span>
        </p>
      </div>

      <div className="mt-4">
        <GlowingProgress value={99.9} />
      </div>

      <p className="mt-3 text-[14px] text-white/85">
        {burnedAmountMetrics.circulating.note}{" "}
        <span className="text-white/70">{burnedAmountMetrics.circulating.noteSuffix}</span>
      </p>
    </div>
  );
}

function BurnedAmountSection() {
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
              value={burnedAmountMetrics.totalSupplyBurned}
              subtitle={burnedAmountMetrics.totalSupplyBurnedLabel}
              progress={0.1}
            />

            <div className="grid gap-4">
              <div className="grid gap-4 xl:grid-cols-2">
                <BurnedMetricBlock
                  title="Tokens"
                  items={burnedAmountMetrics.tokens}
                  footer="0% of Token Supply"
                  progressValue={100}
                />
                <BurnedMetricBlock
                  title="Liquidity"
                  items={burnedAmountMetrics.liquidity}
                  footer="0% of Token Supply"
                  progressValue={100}
                />
              </div>

              <CirculatingSupplyBlock />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LockersSection() {
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
              value={lockersMetrics.totalTokensLocked}
              subtitle={lockersMetrics.totalTokensLockedLabel}
              progress={20.2}
            />

            <div className="grid gap-4 xl:grid-cols-2">
              <BurnedMetricBlock
                title="Tokens"
                items={lockersMetrics.tokens}
                footer="20.2% of Token Supply"
                progressValue={78}
              />
              <BurnedMetricBlock
                title="Liquidity"
                items={lockersMetrics.liquidity}
                footer="0% of Token Supply"
                progressValue={100}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AuditSummary() {
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
            <Image
              src="/images/logo.svg"
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
            ODICYBER
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
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_364px]">
          <FindingsBreakdown />
          <AuditDetailsCard />
        </section>

        <section className="mt-4">
          <BurnedAmountSection />
        </section>

        <section className="mt-4">
          <LockersSection />
        </section>
      </div>
    </main>
  );
}
