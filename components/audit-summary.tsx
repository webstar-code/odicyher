"use client";

import Image from "next/image";
import { AlertTriangle, Check, ChevronUp, Copy, Download, Shield, X } from "lucide-react";

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

const contractSecurityMetrics = {
  score: 92,
  maxScore: 100,
  summary:
    "Overall smart contract safety score based on static analysis and manual review.",
  checks: [
    { label: "Reentrancy Protection", status: "Safe", tone: "safe" as const },
    { label: "Ownership Control", status: "Secure", tone: "safe" as const },
    { label: "Overflow Protection", status: "Safe", tone: "safe" as const },
    { label: "Proxy Pattern Safety", status: "Review", tone: "review" as const },
    { label: "Upgrade Authorization", status: "Missing", tone: "missing" as const },
    { label: "Emergency Pause", status: "Missing", tone: "missing" as const },
  ],
};

const contractInformation = {
  tokenDetails: [
    { label: "Token Name", value: "LFUSD Coin" },
    { label: "Symbol", value: "LFUSD" },
    { label: "Standard", value: "ERC-20" },
    { label: "Decimals", value: "50,000,000,000" },
    { label: "Total Supply", value: "50,000,000,000" },
  ],
  deploymentDetails: [
    { label: "Deployer Address", value: "0x52a...91a", actionLabel: "Copy deployer address" },
    { label: "Contract Creator", value: "EOA", actionLabel: "Copy contract creator" },
    { label: "Verified Source", value: "Yes", actionLabel: "Copy verified source" },
    { label: "Compiler Version", value: "0.8.19", actionLabel: "Copy compiler version" },
    { label: "Optimization", value: "Enabled", actionLabel: "Copy optimization status" },
  ],
};

const ownershipAndLiquidityRisk = {
  ownerControl: {
    value: "54.8%",
    subtitle: "Owner Control",
    progress: 54.8,
    holders: [
      { label: "Deploying Wallet", value: "8.00B", suffix: "(16.0%)", color: "#6eb8ff" },
      { label: "Staking Contract", value: "6.00B", suffix: "(12.0%)", color: "#f2b34d" },
      { label: "Exchange Wallets", value: "5.21B", suffix: "(10.0%)", color: "#f0a793" },
      { label: "Multi-Sig Wallet", value: "4.51B", suffix: "(9.0%)", color: "#a4c8ff" },
    ],
    warning:
      "Liquidity is not locked and could be withdrawn at any time, posing a significant risk of funds being pulled out from the pool.",
  },
  liquidityHolder: {
    title: "Top Liquidity Holder",
    holder: "OTWS....fFGD",
    chipPrimary: "862.3B",
    chipSecondary: "CTH",
    footerLabel: "92.4% of Total Liquidity",
    footerValue: "92.4%",
    progress: 92.4,
  },
  lockedLiquidity: {
    title: "Locked Liquidity",
    leftValue: "0.ETH",
    rightValue: "0-ETH",
    subLabel: "0.0% al Liquidity Supply",
    rightPercent: "0.0%",
  },
};

const holderDistributionAnalysis = {
  score: {
    value: "54.8%",
    subtitle: "Security Rating",
    progress: 54.8,
  },
  whaleCategory: {
    title: "Whales",
    value: "54.8%",
    progress: 54.8,
    rows: [
      { label: "Whales", value: "27.39B", color: "#67d8ff", active: true },
      { label: "Large Holders", value: "13.1B", color: "#5a9bff" },
      { label: "Small Holders", value: "9.50B", color: "#61b6ff" },
    ],
  },
  liquidityRisk: {
    score: "92.4%",
    subtitle: "Total Holders",
    progress: 92.4,
    holder: "OTW3...FF69",
    primaryValue: "462.38 ETH",
    secondaryValue: "5560 ETH",
    bottomShare: "5.4%",
    bottomAmount: "96018 ETH",
  },
  note:
    "The current tax is within a reasonable range, it is recommended to monitor any changes to tax.",
};

const transactionTaxAnalysis = {
  taxes: [
    { label: "Buy Tax", value: "1%", progress: 22, fillClassName: "bg-[linear-gradient(90deg,#39e3ff_0%,#2a9fc8_100%)] shadow-[0_0_18px_rgba(57,227,255,0.35)]" },
    { label: "Sell Tax", value: "1.5%", progress: 48, fillClassName: "bg-[linear-gradient(90deg,#56c8ff_0%,#5d86ff_100%)] shadow-[0_0_18px_rgba(86,200,255,0.32)]" },
    { label: "Transfer Tax", value: "9.0%", progress: 67, fillClassName: "bg-[linear-gradient(90deg,#214f9f_0%,#2c67ba_100%)] shadow-[0_0_18px_rgba(55,120,220,0.24)]" },
  ],
  breakdownRows: [
    { tax: "Tax", taxValue: "1%", buyLabel: "Buyer Development", buyValue: "0.5%", sellLabel: "Buyer Marketing", sellValue: "0.5%" },
    { tax: "Tax", taxValue: "1.5%", buyLabel: "Buyer Development", buyValue: "0.5%", sellLabel: "Fee Liquidity Pool", sellValue: "0.5%" },
  ],
  note:
    "The current tax is within a reasonable range. It is recommended to monitor any changes to tax parameters.",
  liquidityRisk: {
    title: "Liquidity Risk",
    topHolderTitle: "Top Liquidity Holder",
    holder: "OTW3...FF89",
    chipValue: "462.38 ETH",
    footerLabel: "92.0% of Total Liquidity",
    footerValue: "92.4%",
    progress: 92.4,
    lockedTitle: "Locked Liquidity",
    lockedLeftValue: "0 ETH",
    lockedRightValue: "0 ETH",
    lockedSubLabel: "0.0% of Liquidity Supply",
    lockedPercent: "0.0%",
  },
};

const honeypotAndAntiWhale = {
  honeypot: {
    status: "No Honeypot Detected",
    checks: [
      "Sell Function Usable",
      "No External Fund Lock",
      "No Suspicious Code Detected",
    ],
    note: "This contract does not exhibit any honeypot characteristics.",
  },
  antiWhale: {
    ringValue: "500M",
    ringSubtitle: "Tokens",
    progress: 92.4,
    title: "500M Tokens",
    subLabel: "Control",
    footerLeft: "2.0% Tokens",
    footerRight: "92.4%",
    baseValue: "500 ETH",
    baseSubLabel: "0.3 Total Liquidity",
    statRows: [
      { label: "Transfer Limit", value: "2.0%", status: "Enabled" },
      { label: "Max Wallet Limit", value: "2.0%", status: "Enabled" },
      { label: "Max Transaction Limit", value: "500M", status: "Enabled" },
    ],
    note: "An anti-whale mechanism is in place to limit the impact of large token holders on the trade zones.",
  },
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
      {title ? <p className="text-center text-[15px] text-white/85">{title}</p> : null}

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

function SecurityScorePanel() {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="grid min-h-full lg:grid-rows-[1fr_auto]">
        <div className="grid gap-6 p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
          <SupplyRing
            title=""
            value={`${contractSecurityMetrics.score}`}
            subtitle="Security Rating"
            progress={contractSecurityMetrics.score}
          />

          <div className="flex flex-col justify-center">
            <p className="text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[26px]">
              Security Score
            </p>
            <p className="mt-3 text-[58px] leading-none font-semibold tracking-[-0.05em] text-[#82ccff]">
              {contractSecurityMetrics.score}
              <span className="ml-1 text-[28px] font-medium text-white/85">
                /{contractSecurityMetrics.maxScore}
              </span>
            </p>
            <p className="mt-5 max-w-[320px] text-[15px] leading-8 text-white/78">
              {contractSecurityMetrics.summary}
            </p>
          </div>
        </div>

        <div className="border-t border-[#33476e]/45 bg-[linear-gradient(180deg,rgba(7,13,29,0.08)_0%,rgba(7,13,29,0.32)_100%)] px-5 py-5 text-[15px] text-white/78">
          {contractSecurityMetrics.summary}
        </div>
      </div>
    </div>
  );
}

function SecurityChecksPanel() {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
          Security Checks
        </h3>

        <div className="mt-5 space-y-0">
          {contractSecurityMetrics.checks.map((check) => (
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

function ContractSecurityMetricsSection() {
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
          <SecurityScorePanel />
          <SecurityChecksPanel />
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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch { }
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-3 border-b border-[#33476e]/45 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <div className="grid min-w-0 grid-cols-[minmax(110px,1fr)_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[150px_minmax(0,1fr)]">
        <span className="text-[15px] text-white/78 sm:text-[16px]">{label}</span>
        <span className="truncate text-right text-[15px] font-semibold text-white sm:text-[16px]">
          {value}
        </span>
      </div>

      {actionLabel ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={handleCopy}
          className="h-8 w-8 rounded-[8px] border border-[#6776a7]/60 bg-[linear-gradient(180deg,rgba(48,57,92,0.92)_0%,rgba(34,42,74,0.92)_100%)] text-white/90 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] hover:bg-[linear-gradient(180deg,rgba(58,68,106,0.96)_0%,rgba(40,49,86,0.96)_100%)]"
          aria-label={actionLabel}
        >
          <Copy className="size-3.5" />
        </Button>
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

function ContractInformationSection() {
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
          <InformationPanel title="Token Details" rows={contractInformation.tokenDetails} />
          <InformationPanel
            title="Deployment Details"
            rows={contractInformation.deploymentDetails}
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

function OwnershipPrivilegesPanel() {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="grid min-h-full lg:grid-rows-[1fr_auto]">
        <div className="grid gap-6 p-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
          <SupplyRing
            title=""
            value={ownershipAndLiquidityRisk.ownerControl.value}
            subtitle={ownershipAndLiquidityRisk.ownerControl.subtitle}
            progress={ownershipAndLiquidityRisk.ownerControl.progress}
          />

          <div className="flex flex-col justify-center">
            <p className="text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[26px]">
              Top Holders
            </p>

            <div className="mt-5 space-y-4">
              {ownershipAndLiquidityRisk.ownerControl.holders.map((holder) => (
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
              {ownershipAndLiquidityRisk.ownerControl.warning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiquidityRiskDetailPanel() {
  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

        <div className="relative">
          <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
            {ownershipAndLiquidityRisk.liquidityHolder.title}
          </h3>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#33476e]/45 pt-4">
            <span className="text-[18px] text-white/88">
              {ownershipAndLiquidityRisk.liquidityHolder.holder}
            </span>
            <div className="inline-flex items-center gap-1 rounded-[9px] border border-[#4b4b95]/60 bg-[linear-gradient(180deg,rgba(55,56,118,0.9)_0%,rgba(34,35,84,0.9)_100%)] px-3 py-1 text-[13px] font-semibold text-[#b8c6ff]">
              <span>{ownershipAndLiquidityRisk.liquidityHolder.chipPrimary}</span>
              <span className="text-white/70">
                {ownershipAndLiquidityRisk.liquidityHolder.chipSecondary}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <GlowingProgress value={ownershipAndLiquidityRisk.liquidityHolder.progress} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-white/72">
              {ownershipAndLiquidityRisk.liquidityHolder.footerLabel}
            </span>
            <span className="font-semibold text-white">
              {ownershipAndLiquidityRisk.liquidityHolder.footerValue}
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

        <div className="relative">
          <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
            {ownershipAndLiquidityRisk.lockedLiquidity.title}
          </h3>

          <div className="mt-5 border-t border-[#33476e]/45 pt-4">
            <div className="flex items-center justify-between gap-3 text-[18px] font-medium text-white/88">
              <span>{ownershipAndLiquidityRisk.lockedLiquidity.leftValue}</span>
              <span>{ownershipAndLiquidityRisk.lockedLiquidity.rightValue}</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
              <span className="text-white/72">
                {ownershipAndLiquidityRisk.lockedLiquidity.subLabel}
              </span>
              <span className="font-semibold text-white">
                {ownershipAndLiquidityRisk.lockedLiquidity.rightPercent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OwnershipAndPrivilegesSection() {
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
            <OwnershipPrivilegesPanel />
          </div>

          <div className="space-y-4">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
              Liquidity Risk
            </h2>
            <LiquidityRiskDetailPanel />
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

function HolderDistributionPanel() {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="grid min-h-full lg:grid-rows-[1fr_auto]">
        <div className="grid gap-6 p-5 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
          <SupplyRing
            title=""
            value={holderDistributionAnalysis.score.value}
            subtitle={holderDistributionAnalysis.score.subtitle}
            progress={holderDistributionAnalysis.score.progress}
          />

          <div className="flex flex-col justify-center">
            <div className="flex items-end justify-between gap-3">
              <h3 className="text-[26px] font-semibold tracking-[-0.03em] text-white sm:text-[28px]">
                {holderDistributionAnalysis.whaleCategory.title}
              </h3>
              <span className="text-[22px] font-semibold text-white">
                {holderDistributionAnalysis.whaleCategory.value}
              </span>
            </div>

            <div className="mt-3">
              <GlowingProgress value={holderDistributionAnalysis.whaleCategory.progress} />
            </div>

            <div className="mt-4">
              {holderDistributionAnalysis.whaleCategory.rows.map((row) => (
                <DistributionLegendRow key={row.label} {...row} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#33476e]/45 bg-[linear-gradient(180deg,rgba(7,13,29,0.08)_0%,rgba(7,13,29,0.32)_100%)] px-5 py-5 text-[15px] text-white/78">
          {holderDistributionAnalysis.note}
        </div>
      </div>
    </div>
  );
}

function CompactLiquidityRiskPanel() {
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
                    background: `conic-gradient(from 220deg, rgba(117,204,255,1) 0deg, rgba(112,141,255,1) ${holderDistributionAnalysis.liquidityRisk.progress * 3.6}deg, rgba(210,223,255,0.95) ${holderDistributionAnalysis.liquidityRisk.progress * 3.6}deg, rgba(210,223,255,0.95) 360deg)`,
                    boxShadow:
                      "0 0 22px rgba(96,183,255,0.26), inset 0 0 18px rgba(96,183,255,0.18)",
                  }}
                />
                <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(22,46,92,0.8),rgba(4,10,24,0.96)_60%)]" />
                <div className="absolute inset-[15px] rounded-full border border-[#5d7bc5]/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] text-[#dff6ff]">
                    {holderDistributionAnalysis.liquidityRisk.score}
                  </span>
                  <span className="mt-1 text-[12px] text-white/78">
                    {holderDistributionAnalysis.liquidityRisk.subtitle}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[16px] font-medium text-white/88">
                {holderDistributionAnalysis.liquidityRisk.holder}
              </div>
              <div className="rounded-[10px] border border-[#33476e]/55 bg-[rgba(10,18,40,0.6)] px-3 py-2">
                <GlowingProgress value={holderDistributionAnalysis.liquidityRisk.progress} />
              </div>
              <div className="text-[15px] text-white/75">
                {holderDistributionAnalysis.liquidityRisk.primaryValue}
              </div>
              <div className="inline-flex rounded-[9px] border border-[#4d3f70]/55 bg-[linear-gradient(180deg,rgba(58,45,90,0.88)_0%,rgba(38,29,60,0.88)_100%)] px-3 py-1 text-[13px] font-medium text-[#d8d0ff]">
                {holderDistributionAnalysis.liquidityRisk.secondaryValue}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-[#33476e]/45 pt-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(30,69,150,0.95)_0%,rgba(19,41,97,0.95)_100%)] text-[15px] font-semibold text-white shadow-[0_0_18px_rgba(74,148,255,0.25)]">
              α
            </div>
            <span className="text-[15px] font-semibold text-white">
              {holderDistributionAnalysis.liquidityRisk.bottomShare}
            </span>
            <div className="min-w-0 flex-1">
              <GlowingProgress
                value={5.4}
                trackClassName="h-2"
                fillClassName="bg-[linear-gradient(90deg,#ffffff_0%,#dfe8ff_100%)] shadow-none"
              />
            </div>
            <span className="text-[14px] text-white/74">
              {holderDistributionAnalysis.liquidityRisk.bottomAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HolderDistributionAnalysisSection() {
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
          <HolderDistributionPanel />
          <CompactLiquidityRiskPanel />
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
  return (
    <div className="grid grid-cols-[104px_minmax(0,1fr)_52px] items-center gap-4 sm:grid-cols-[110px_minmax(0,1fr)_64px]">
      <span className="text-[16px] text-white/88 sm:text-[17px]">{label}</span>
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <GlowingProgress value={progress} fillClassName={fillClassName} />
        </div>
        <span className="shrink-0 text-[14px] font-medium text-white/85">{value}</span>
      </div>
      <span className="text-right text-[16px] font-medium text-white/88">{value}</span>
    </div>
  );
}

function TaxBreakdownGrid() {
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

        {transactionTaxAnalysis.breakdownRows.map((row) => (
          <>
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
          </>
        ))}
      </div>
    </div>
  );
}

function TransactionTaxPanel() {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#33476e]/60 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_70%_80%_at_22%_20%,rgba(58,140,255,0.18),transparent_60%),radial-gradient(ellipse_70%_80%_at_75%_10%,rgba(134,156,255,0.12),transparent_55%)]" />

      <div className="relative">
        <div className="space-y-6">
          {transactionTaxAnalysis.taxes.map((tax) => (
            <TaxProgressRow key={tax.label} {...tax} />
          ))}
        </div>

        <div className="mt-6">
          <TaxBreakdownGrid />
        </div>

        <p className="mt-5 text-[15px] leading-7 text-white/78">
          {transactionTaxAnalysis.note}
        </p>
      </div>
    </div>
  );
}

function TaxLiquidityRiskPanel() {
  const risk = transactionTaxAnalysis.liquidityRisk;

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
            <GlowingProgress value={risk.progress} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-white/72">{risk.footerLabel}</span>
            <span className="font-semibold text-white">{risk.footerValue}</span>
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

function TransactionTaxAnalysisSection() {
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
          <TransactionTaxPanel />
          <TaxLiquidityRiskPanel />
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

function HoneypotDetectionPanel() {
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
                {honeypotAndAntiWhale.honeypot.status}
              </div>

              <div className="mt-4 space-y-3">
                {honeypotAndAntiWhale.honeypot.checks.map((item) => (
                  <DetectionCheckRow key={item} label={item} />
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-[14px] text-white/72">
            {honeypotAndAntiWhale.honeypot.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function AntiWhaleMechanismPanel() {
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
                    background: `conic-gradient(from 220deg, rgba(117,204,255,1) 0deg, rgba(112,141,255,1) ${honeypotAndAntiWhale.antiWhale.progress * 3.6}deg, rgba(210,223,255,0.95) ${honeypotAndAntiWhale.antiWhale.progress * 3.6}deg, rgba(210,223,255,0.95) 360deg)`,
                    boxShadow:
                      "0 0 22px rgba(96,183,255,0.26), inset 0 0 18px rgba(96,183,255,0.18)",
                  }}
                />
                <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(22,46,92,0.8),rgba(4,10,24,0.96)_60%)]" />
                <div className="absolute inset-[15px] rounded-full border border-[#5d7bc5]/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] text-[#dff6ff]">
                    {honeypotAndAntiWhale.antiWhale.ringValue}
                  </span>
                  <span className="mt-1 text-[12px] text-white/78">
                    {honeypotAndAntiWhale.antiWhale.ringSubtitle}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[16px] font-semibold text-white/92">
                {honeypotAndAntiWhale.antiWhale.title}
              </div>
              <div className="mt-1 text-[13px] text-white/66">
                {honeypotAndAntiWhale.antiWhale.subLabel}
              </div>

              <div className="mt-4">
                <GlowingProgress value={honeypotAndAntiWhale.antiWhale.progress} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
                <span className="text-white/72">{honeypotAndAntiWhale.antiWhale.footerLeft}</span>
                <span className="font-semibold text-white">{honeypotAndAntiWhale.antiWhale.footerRight}</span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
                <span className="font-medium text-white/84">{honeypotAndAntiWhale.antiWhale.baseValue}</span>
                <span className="text-white/55">{honeypotAndAntiWhale.antiWhale.baseSubLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[16px] border border-[#33476e]/55 bg-[linear-gradient(180deg,rgba(6,13,30,0.45)_0%,rgba(6,13,30,0.2)_100%)] p-4">
          <div className="space-y-3">
            {honeypotAndAntiWhale.antiWhale.statRows.map((row) => (
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
            {honeypotAndAntiWhale.antiWhale.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function HoneypotAndAntiWhaleSection() {
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
          <HoneypotDetectionPanel />
          <AntiWhaleMechanismPanel />
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

        <section className="mt-4">
          <ContractSecurityMetricsSection />
        </section>

        <section className="mt-4">
          <ContractInformationSection />
        </section>

        <section className="mt-4">
          <OwnershipAndPrivilegesSection />
        </section>

        <section className="mt-4">
          <HolderDistributionAnalysisSection />
        </section>

        <section className="mt-4">
          <TransactionTaxAnalysisSection />
        </section>

        <section className="mt-4">
          <HoneypotAndAntiWhaleSection />
        </section>
      </div>
    </main>
  );
}
