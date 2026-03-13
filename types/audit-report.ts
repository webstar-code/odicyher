export type StatKey = "total" | "critical" | "medium" | "minor" | "resolved";

export interface SummaryCard {
  label: string;
  value: number;
  icon: string;
  tone: StatKey;
}

export interface LegendItem {
  label: string;
  count: number;
  tone: StatKey;
}

export interface Issue {
  id: string;
  title: string;
  severity: string;
}

export interface DetailRow {
  label: string;
  value: string;
}

export interface BurnedMetricItem {
  label: string;
  value: string;
  suffix: string;
  color: string;
}

export interface BurnedAmountMetrics {
  totalSupplyBurned: string;
  totalSupplyBurnedLabel: string;
  tokens: BurnedMetricItem[];
  liquidity: BurnedMetricItem[];
  circulating: {
    value: string;
    suffix: string;
    note: string;
    noteSuffix: string;
  };
}

export interface LockersMetrics {
  totalTokensLocked: string;
  totalTokensLockedLabel: string;
  tokens: BurnedMetricItem[];
  liquidity: BurnedMetricItem[];
}

export type SecurityCheckTone = "safe" | "review" | "missing";

export interface SecurityCheck {
  label: string;
  status: string;
  tone: SecurityCheckTone;
}

export interface ContractSecurityMetrics {
  score: number;
  maxScore: number;
  summary: string;
  checks: SecurityCheck[];
}

export interface InformationRow {
  label: string;
  value: string;
  actionLabel?: string;
}

export interface ContractInformation {
  tokenDetails: InformationRow[];
  deploymentDetails: InformationRow[];
}

export interface OwnershipHolder {
  label: string;
  value: string;
  suffix: string;
  color: string;
}

export interface OwnershipAndLiquidityRisk {
  ownerControl: {
    value: string;
    subtitle: string;
    progress: number;
    holders: OwnershipHolder[];
    warning: string;
  };
  liquidityHolder: {
    title: string;
    holder: string;
    chipPrimary: string;
    chipSecondary: string;
    footerLabel: string;
    footerValue: string;
    progress: number;
  };
  lockedLiquidity: {
    title: string;
    leftValue: string;
    rightValue: string;
    subLabel: string;
    rightPercent: string;
  };
}

export interface WhaleCategoryRow {
  label: string;
  value: string;
  color: string;
  active?: boolean;
}

export interface HolderDistributionAnalysis {
  score: {
    value: string;
    subtitle: string;
    progress: number;
  };
  whaleCategory: {
    title: string;
    value: string;
    progress: number;
    rows: WhaleCategoryRow[];
  };
  liquidityRisk: {
    score: string;
    subtitle: string;
    progress: number;
    holder: string;
    primaryValue: string;
    secondaryValue: string;
    bottomShare: string;
    bottomAmount: string;
  };
  note: string;
}

export interface TaxBreakdownRow {
  tax: string;
  taxValue: string;
  buyLabel: string;
  buyValue: string;
  sellLabel: string;
  sellValue: string;
}

export interface TaxItem {
  label: string;
  value: string;
  progress: number;
  fillClassName: string;
}

export interface TransactionTaxLiquidityRisk {
  title: string;
  topHolderTitle: string;
  holder: string;
  chipValue: string;
  footerLabel: string;
  footerValue: string;
  progress: number;
  lockedTitle: string;
  lockedLeftValue: string;
  lockedRightValue: string;
  lockedSubLabel: string;
  lockedPercent: string;
}

export interface TransactionTaxAnalysis {
  taxes: TaxItem[];
  breakdownRows: TaxBreakdownRow[];
  note: string;
  liquidityRisk: TransactionTaxLiquidityRisk;
}

export interface HoneypotSection {
  status: string;
  checks: string[];
  note: string;
}

export interface AntiWhaleStatRow {
  label: string;
  value: string;
  status: string;
}

export interface AntiWhaleSection {
  ringValue: string;
  ringSubtitle: string;
  progress: number;
  title: string;
  subLabel: string;
  footerLeft: string;
  footerRight: string;
  baseValue: string;
  baseSubLabel: string;
  statRows: AntiWhaleStatRow[];
  note: string;
}

export interface HoneypotAndAntiWhale {
  honeypot: HoneypotSection;
  antiWhale: AntiWhaleSection;
}

export type ProjectBadgeTone = "amber" | "indigo" | "blue";

export interface ProjectBadge {
  label: string;
  /** Icon name resolvable via PROJECT_ICON_MAP (e.g. "Globe", "Hexagon"). Must be serializable for Server → Client. */
  icon: string;
  tone: ProjectBadgeTone;
}

export interface ProjectAction {
  label: string;
  /** Icon name resolvable via PROJECT_ICON_MAP (e.g. "Globe", "Link2"). Must be serializable for Server → Client. */
  icon: string;
}

export interface ProjectOverview {
  title: string;
  website: string;
  description: string;
  actions: ProjectAction[];
  badges: ProjectBadge[];
  onboarded: string;
  verifiedLabel: string;
}

/**
 * The canonical content structure for an audit report page.
 *
 * This is what will live inside the `content` JSON column
 * for each row in the `audit_reports` table.
 */
export interface AuditReport {
  // Summary section
  summaryCards: SummaryCard[];
  legendItems: LegendItem[];

  // Findings section
  issues: Issue[];

  // Audit details section
  detailRows: DetailRow[];

  // Burned amount section
  burnedAmountMetrics: BurnedAmountMetrics;

  // Lockers section
  lockersMetrics: LockersMetrics;

  // Contract security section
  contractSecurityMetrics: ContractSecurityMetrics;

  // Contract information section
  contractInformation: ContractInformation;

  // Ownership & liquidity section
  ownershipAndLiquidityRisk: OwnershipAndLiquidityRisk;

  // Holder distribution section
  holderDistributionAnalysis: HolderDistributionAnalysis;

  // Transaction tax section
  transactionTaxAnalysis: TransactionTaxAnalysis;

  // Honeypot & anti-whale section
  honeypotAndAntiWhale: HoneypotAndAntiWhale;

  // Project overview section
  projectOverview: ProjectOverview;
}

/**
 * High-level status for an audit report row.
 */
export type AuditReportStatus = "draft" | "published";

/**
 * Minimal metadata we want to store alongside the JSON content.
 */
export interface AuditReportMetadata {
  id: string;
  slug: string;
  title: string;
  status: AuditReportStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Shape of a single row in the future `audit_reports` table:
 * one record per report, with one JSON `content` field.
 */
export interface AuditReportRecord extends AuditReportMetadata {
  content: AuditReport;
}

