"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const STATUS_COLORS = {
  total: "var(--light-grey)",
  critical: "var(--status-critical)",
  medium: "var(--status-medium)",
  minor: "var(--status-minor)",
  resolved: "var(--status-resolved)",
} as const;

const chartData = [
  { name: "Critical", value: 1, fill: STATUS_COLORS.critical },
  { name: "Medium", value: 1, fill: STATUS_COLORS.medium },
  { name: "Minor", value: 3, fill: STATUS_COLORS.minor },
  { name: "Resolved", value: 0, fill: STATUS_COLORS.resolved },
];

const chartConfig = {
  value: { label: "Findings", color: "var(--text-main)" },
  critical: { label: "Critical", color: STATUS_COLORS.critical },
  medium: { label: "Medium", color: STATUS_COLORS.medium },
  minor: { label: "Minor", color: STATUS_COLORS.minor },
  resolved: { label: "Resolved", color: STATUS_COLORS.resolved },
};

const summaryCards = [
  { label: "Total Findings", value: 3, dotColor: STATUS_COLORS.total, icon: "findings" },
  { label: "Critical", value: 0, dotColor: STATUS_COLORS.critical, icon: "critical" },
  { label: "Medium", value: 0, dotColor: STATUS_COLORS.medium, icon: "medium" },
  { label: "Minor", value: 3, dotColor: STATUS_COLORS.minor, icon: "minor" },
  { label: "Resolved", value: 0, dotColor: STATUS_COLORS.resolved, icon: "resolved" },
];

const issues = [
  { id: "NWES", title: "ERC-20 Standard Noncompliance", severity: "Minor" },
  { id: "MC", title: "Missing Validation Check", severity: "Minor" },
  { id: "L19", title: "Compiler Version Not Pinned", severity: "Minor" },
];

const auditDetails = [
  { label: "Network", value: "Binance Smart Chain" },
  { label: "Contract", value: "0x315e_c2bf", copyable: true },
  { label: "File Audited", value: "LFUSDcoin.sol", copyable: true },
  { label: "SHA256", value: "d0955f_fc0eb", copyable: true },
  { label: "Audit Date", value: "March 2026" },
];

const cardBgTints = {
  total: "bg-soft-cream",
  critical: "bg-[color-mix(in_srgb,var(--status-critical)_10%,var(--soft-cream))]",
  medium: "bg-[color-mix(in_srgb,var(--status-medium)_10%,var(--soft-cream))]",
  minor: "bg-[color-mix(in_srgb,var(--status-minor)_10%,var(--soft-cream))]",
  resolved: "bg-[color-mix(in_srgb,var(--status-resolved)_10%,var(--soft-cream))]",
};

const cardGradients = {
  findings: "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(255,255,255,0.55) 0%, transparent 70%), linear-gradient(to top right, #989faf80 0%, #989faf90 10%, #b8bdc8 40%, #F6F1EA 100%)",
  critical: "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(255,255,255,0.55) 0%, transparent 70%), linear-gradient(to top right, #de534780 0%, #de534790 10%, #e88a7e 40%, #F6F1EA 100%)",
  medium: "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(255,255,255,0.55) 0%, transparent 70%), linear-gradient(to top right, #ffcf8280 0%, #ffcf8290 10%, #ffdfa8 40%, #F6F1EA 100%)",
  minor: "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(255,255,255,0.55) 0%, transparent 70%), linear-gradient(to top right, #9aceec80 0%, #9aceec90 10%, #b8dff2 40%, #F6F1EA 100%)",
  resolved: "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(255,255,255,0.55) 0%, transparent 70%), linear-gradient(to top right, #61ac8680 0%, #61ac8690 10%, #8fc4a3 40%, #F6F1EA 100%)",
};

export function AuditSummary() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <Image src="/images/logo.svg" alt="ODICYBER Logo" width={128} height={128} />
        </div>
        <h1 className="text-4xl font-bold" style={{ color: "var(--gold-dark)" }}>
          ODICYBER
        </h1>
        <p
          className="mt-1 text-xs tracking-widest"
          style={{ color: "var(--text-secondary)" }}
        >
          BLOCKCHAIN SECURITY & AUDIT
        </p>
      </header>

      {/* Main Title */}
      <h2
        className="mb-6 text-center text-2xl font-semibold"
        style={{ color: "var(--text-main)" }}
      >
        Smart Contract Audit Summary
      </h2>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        {summaryCards.map((card, i) => (
          <Card
            key={card.label}
            className={cn(
              "border-border-light bg-luxury-white shadow-sm py-0 overflow-hidden",
              i === 1 && cardBgTints.critical,
              i === 2 && cardBgTints.medium,
              i === 3 && cardBgTints.minor,
              i === 4 && cardBgTints.resolved
            )}
          >
            <CardContent
              className="relative flex items-start gap-2 p-4 overflow-hidden"
              style={{ background: cardGradients[card.icon as keyof typeof cardGradients] }}
            >
              {/* <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: `url(" data:image /svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "160px 160px",
                opacity: 0.07,
                mixBlendMode: "soft-light" }}>
            </div> */}

              <div className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "160px 160px",
                  opacity: 0.18,
                  mixBlendMode: "multiply"
                }}>
              </div>
              <div className="flex mt-1">
                {card.icon && <Image src={`/images/badges/${card.icon}.svg`} alt={card.icon} width={24} height={24} />}
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="text-base font-semibold"
                  style={{ color: "var(--text-main)" }}
                >
                  {card.label}
                </span>
                <p
                  className="text-3xl font-bold"
                  style={{ color: "var(--text-main)" }}
                >
                  {card.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Findings Breakdown */}
        <Card className="relative border-border-light bg-[#FEF6F3] shadow-sm lg:col-span-2 gap-0">
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
              opacity: 0.25,
              mixBlendMode: "multiply"
            }}>
          </div>
          <CardHeader>
            <CardTitle
              className="text-base"
              style={{ color: "var(--text-main)" }}
            >
              Findings Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="w-full flex gap-6 ">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="relative mx-auto size-[180px]">
                  <ChartContainer config={chartConfig} className="size-full aspect-square">
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={1}

                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill}
                            style={{
                              filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))`,
                            }}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    aria-hidden
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "var(--text-main)" }}
                    >
                      3
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Critical", color: STATUS_COLORS.critical, count: 0 },
                    { label: "Medium", color: STATUS_COLORS.medium, count: 0 },
                    { label: "Minor", color: STATUS_COLORS.minor, count: 3 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2"
                      style={{ color: "var(--text-main)" }}
                    >
                      <div
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">
                        {item.label} {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>


              <div className="w-full flex flex-col">
                <p className="text-lg">Issue Title</p>
                {issues.slice(0, 2).map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center justify-between border-b border-border-light bg-luxury-white px-3 py-2"
                  >
                    <div className="flex items-center gap-2 border p-1 rounded-md">
                      <div
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: STATUS_COLORS.minor }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-main)" }}
                      >
                        Minor
                      </span>
                    </div>
                    <Button
                    size={"xs"}
                    variant={"wheat"}
                    >
                    Acknowledged

                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle: Issues */}
        {/* <Card className="border-border-light bg-soft-cream shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle
              className="text-base"
              style={{ color: "var(--text-main)" }}
            >
              Issue Title
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {issues.slice(0, 2).map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between rounded-lg border border-border-light bg-luxury-white px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS.minor }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-main)" }}
                    >
                      Minor
                    </span>
                  </div>
                  <Badge
                    className="border-0"
                    style={{
                      backgroundColor: "var(--gold-soft)",
                      color: "var(--text-main)",
                    }}
                  >
                    Acknowledged
                  </Badge>
                </div>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border-light hover:bg-transparent">
                  <TableHead
                    className="text-xs"
                    style={{ color: "var(--text-main)" }}
                  >
                    Severity &gt;
                  </TableHead>
                  <TableHead
                    className="text-xs"
                    style={{ color: "var(--text-main)" }}
                  >
                    ID
                  </TableHead>
                  <TableHead
                    className="text-xs"
                    style={{ color: "var(--text-main)" }}
                  >
                    Issue Title
                  </TableHead>
                  <TableHead
                    className="text-xs"
                    style={{ color: "var(--text-main)" }}
                  >
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow
                    key={issue.id}
                    className="border-border-light"
                  >
                    <TableCell>
                      <Badge
                        className="border-0"
                        style={{
                          backgroundColor: "var(--gold-primary)",
                          color: "white",
                        }}
                      >
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: "var(--text-main)" }}>
                      {issue.id}
                    </TableCell>
                    <TableCell style={{ color: "var(--text-main)" }}>
                      {issue.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="border-0"
                        style={{
                          backgroundColor: "var(--gold-soft)",
                          color: "var(--text-main)",
                        }}
                      >
                        Acknowledged
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}

        {/* Right: Audit Details */}
        <Card className="border-border-light bg-soft-cream shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle
              className="text-base"
              style={{ color: "var(--text-main)" }}
            >
              Audit Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="space-y-3 text-sm"
              style={{ color: "var(--text-main)" }}
            >
              {auditDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-2"
                >
                  <span
                    className="shrink-0"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.label}:
                  </span>
                  <span className="truncate text-right font-medium">
                    {item.value}
                    {item.copyable && (
                      <button
                        type="button"
                        className="ml-1 inline-flex size-4 shrink-0 items-center justify-center rounded border border-border-light bg-luxury-white text-[10px] hover:bg-soft-cream"
                        aria-label="Copy"
                      >
                        D
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <Button size={"lg"} className="w-full">
              <Download className="size-4" />
              Download Full Report (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div >
  );
}
