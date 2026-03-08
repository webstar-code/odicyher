"use client";

import Image from "next/image";
import { Copy, Download } from "lucide-react";

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
  total: "#a8b0bd",
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

const panelClassName =
  "border-[#dccfbf] bg-[linear-gradient(180deg,rgba(249,245,238,0.97)_0%,rgba(244,237,227,0.99)_100%)] shadow-[0_10px_24px_rgba(126,101,64,0.12),0_2px_0_rgba(255,255,255,0.75)_inset] rounded-[18px]";

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4 text-center">
      <div className="h-px w-[120px] bg-[linear-gradient(90deg,transparent,rgba(180,151,106,0.68),transparent)] sm:w-[165px]" />
      <h2 className="text-[20px] font-medium tracking-[-0.01em] text-[#433f39] sm:text-[22px]">
        {title}
      </h2>
      <div className="h-px w-[120px] bg-[linear-gradient(90deg,transparent,rgba(180,151,106,0.68),transparent)] sm:w-[165px]" />
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
      className="overflow-hidden rounded-[13px] border-[#d8c9b8] py-0 shadow-[0_6px_14px_rgba(116,93,59,0.12),0_1px_0_rgba(255,255,255,0.95)_inset]"
      style={{ background: statCardGradients[tone] }}
    >
      <CardContent className="relative flex min-h-[90px] flex-col justify-center px-4 py-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.9),transparent_28%),radial-gradient(circle_at_80%_110%,rgba(155,132,96,0.20),transparent_34%)] opacity-[0.14]" />
        <div className="relative flex items-start gap-2.5">
          <Image
            src={`/images/badges/${icon}.svg`}
            alt=""
            width={23}
            height={23}
            className="mt-0.5 h-[20px] w-[20px] shrink-0 sm:h-[23px] sm:w-[23px]"
          />
          <div className="min-w-0">
            <p className="text-[14px] leading-none text-[#4a453f] sm:text-[15px]">{label}</p>
            <p className="mt-2 text-center text-[28px] leading-none font-medium tracking-[-0.03em] text-[#3d3833] sm:text-[32px]">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SeverityBadge({ children }: { children: string }) {
  return (
    <Badge
      className="h-7 rounded-[999px] border border-[#d4b27b] bg-[linear-gradient(180deg,#f6deb5_0%,#dfbc83_100%)] px-3 text-[13px] font-medium text-[#6c4c1f] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_2px_6px_rgba(138,104,45,0.12)]"
    >
      <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#4a9df3] shadow-[0_0_0_1px_rgba(255,255,255,0.55)_inset]" />
      {children}
    </Badge>
  );
}

function StatusBadge() {
  return (
    <Badge className="h-8 rounded-[8px] border border-[#caa36e] bg-[linear-gradient(180deg,#f6e0b8_0%,#ddb67f_100%)] px-4 text-[13px] font-medium text-[#6a5129] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_3px_8px_rgba(126,94,47,0.12)]">
      Acknowledged
    </Badge>
  );
}

function FindingsTable() {
  return (
    <div className="rounded-[14px] border border-[#d8c9b8] bg-[rgba(255,251,246,0.82)] px-3 py-2 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset]">
      <Table>
        <TableHeader>
          <TableRow className="border-[#dfd2c3] hover:bg-transparent">
            <TableHead className="h-8 px-2 text-[14px] font-medium text-[#5a544d]">Severity &gt;</TableHead>
            <TableHead className="h-8 px-2 text-[14px] font-medium text-[#5a544d]">ID</TableHead>
            <TableHead className="h-8 px-2 text-[14px] font-medium text-[#5a544d]">Issue Title</TableHead>
            <TableHead className="h-8 px-2 text-right text-[14px] font-medium text-[#5a544d]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} className="border-[#e6dbcf] hover:bg-transparent">
              <TableCell className="px-2 py-2.5">
                <SeverityBadge>{issue.severity}</SeverityBadge>
              </TableCell>
              <TableCell className="px-2 py-2.5 text-[14px] text-[#4d473f]">{issue.id}</TableCell>
              <TableCell className="px-2 py-2.5 text-[14px] text-[#4d473f]">{issue.title}</TableCell>
              <TableCell className="px-2 py-2.5 text-right">
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
    <Card className={cn(panelClassName, "py-0")}>
      <CardHeader className="px-4 pt-4 pb-3 sm:px-5">
        <CardTitle className="text-[15px] font-medium text-[#433f39] sm:text-[16px]">
          Findings Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="flex items-center gap-4 rounded-[14px] border border-[#dccfbf] bg-[rgba(255,250,245,0.72)] p-3 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
            <div className="relative mx-auto h-[144px] w-[144px] shrink-0 sm:h-[162px] sm:w-[162px]">
              <Image
                src="/images/pie-chart.png"
                alt="Findings breakdown donut chart"
                fill
                sizes="162px"
                className="object-contain"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-[radial-gradient(circle_at_50%_35%,#244780_0%,#122649_65%,#071429_100%)] px-5 py-4 text-[28px] leading-none font-semibold text-white shadow-[0_6px_18px_rgba(19,42,82,0.35)]">
                  3
                </span>
              </div>
            </div>
            <div className="space-y-2.5">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-[16px] text-[#4d473f]">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[item.tone] }}
                  />
                  <span>{item.label}</span>
                  <span className="ml-2 text-[#6f685f]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-[#dccfbf] bg-[rgba(255,251,246,0.82)] p-3 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset]">
            <p className="mb-2 text-[16px] font-medium text-[#4a453f]">Issue Title</p>
            <div className="space-y-2">
              {issues.slice(0, 2).map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between rounded-[10px] border border-[#e3d8cb] bg-[rgba(255,252,248,0.92)] px-3 py-2.5"
                >
                  <SeverityBadge>{issue.severity}</SeverityBadge>
                  <StatusBadge />
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
    } catch {}
  };

  return (
    <div className="grid grid-cols-[max-content_1fr_max-content] items-center gap-3 border-b border-[#e6dbcf] pb-2 last:border-b-0 last:pb-0">
      <span className="text-[14px] text-[#5d5751]">{label}:</span>
      <span className="truncate text-[15px] text-[#4a453f]">{value}</span>
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        onClick={handleCopy}
        className="h-7 w-7 rounded-[7px] border-[#ccb698] bg-[linear-gradient(180deg,#fffaf2_0%,#f0e4cf_100%)] text-[#907047] shadow-[0_1px_0_rgba(255,255,255,0.85)_inset]"
        aria-label={`Copy ${label}`}
      >
        <Copy className="size-3.5" />
      </Button>
    </div>
  );
}

function AuditDetailsCard() {
  return (
    <Card className={cn(panelClassName, "py-0")}>
      <CardHeader className="px-4 pt-4 pb-3 sm:px-5">
        <CardTitle className="text-[15px] font-medium text-[#433f39] sm:text-[16px]">
          Audit Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-5">
        <div className="space-y-3 rounded-[14px] border border-[#dccfbf] bg-[rgba(255,251,246,0.78)] p-3 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
          {detailRows.map((row) => (
            <DetailRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        <Button
          variant="wheat"
          className="h-14 w-full justify-start rounded-[12px] border border-[#caa36e] px-4 text-[18px] font-medium text-[#7a5a28] shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_8px_18px_rgba(143,111,57,0.14)]"
        >
          <Download className="mr-1 size-5" />
          Download Full Report (PDF)
        </Button>
      </CardContent>
    </Card>
  );
}

export function AuditSummary() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f6f1ea_0%,#f7f2ec_45%,#f3ede4_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_46%),radial-gradient(circle_at_0%_55%,rgba(255,255,255,0.82),transparent_30%),radial-gradient(circle_at_100%_60%,rgba(255,255,255,0.82),transparent_30%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(28deg,transparent_0%,transparent_46%,rgba(205,194,179,0.7)_49%,transparent_52%,transparent_100%),linear-gradient(152deg,transparent_0%,transparent_48%,rgba(205,194,179,0.7)_50%,transparent_52%,transparent_100%),linear-gradient(0deg,transparent_0%,transparent_49.6%,rgba(205,194,179,0.55)_50%,transparent_50.4%,transparent_100%)] bg-size-[520px_240px,560px_260px,100%_190px] opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-[linear-gradient(90deg,transparent,rgba(201,173,123,0.7),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-6 pb-12 sm:px-8">
        <header className="flex flex-col items-center">
          <Image
            src="/images/logo.svg"
            alt="ODICYBER"
            width={183}
            height={164}
            priority
            className="h-auto w-[260px] sm:w-[164px]"
          />
          <div className="mt-2">
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
      </div>
    </main>
  );
}
