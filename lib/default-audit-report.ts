import { createAuditReport } from "@/lib/audit-report-schema";

export const defaultAuditReport = createAuditReport({
  summaryCards: [
    { label: "Total Findings", value: 3, icon: "findings", tone: "total" },
    { label: "Critical", value: 0, icon: "critical", tone: "critical" },
    { label: "Medium", value: 0, icon: "medium", tone: "medium" },
    { label: "Minor", value: 3, icon: "minor", tone: "minor" },
    { label: "Resolved", value: 0, icon: "resolved", tone: "resolved" },
  ],
  legendItems: [
    { label: "Critical", count: 0, tone: "critical" },
    { label: "Medium", count: 0, tone: "medium" },
    { label: "Minor", count: 3, tone: "minor" },
  ],
  issues: [
    { id: "NWES", title: "ERC-20 Standard Noncompliance", severity: "Minor" },
    { id: "MC", title: "Missing Validation Check", severity: "Minor" },
    { id: "L19", title: "Compiler Version Not Pinned", severity: "Minor" },
  ],
  detailRows: [
    { label: "Network", value: "Binance Smart Chain" },
    { label: "Contract", value: "0x315e...c2bf" },
    { label: "File Audited", value: "LFUSDcoin.sol" },
    { label: "SHA256", value: "d0955f...fc8eb" },
    { label: "Audit Date", value: "March 2026" },
  ],
  burnedAmountMetrics: {
    totalSupplyBurned: "0.1%",
    totalSupplyBurnedLabel: "of Total Supply",
    tokens: [
      { label: "Tokens", value: "49.4B", suffix: "(100% supply)", color: "#8b98ff" },
      { label: "Burned Tokens", value: "49.4M", suffix: "(0.1% supply)", color: "#cab7ff" },
    ],
    liquidity: [
      { label: "Tokens", value: "5", suffix: "(0% supply)", color: "#efc18f" },
      { label: "Tokens Burned", value: "0", suffix: "(0% supply)", color: "#f5f0dc" },
    ],
    circulating: {
      value: "49.35B",
      suffix: "(99.9% supply)",
      note: "Burned 49.4M",
      noteSuffix: "(0.1% supply)",
    },
  },
  lockersMetrics: {
    totalTokensLocked: "20.2%",
    totalTokensLockedLabel: "of Total Supply",
    tokens: [
      { label: "Tokens", value: "49.4B", suffix: "(100% supply)", color: "#8b98ff" },
      { label: "Locked Tokens", value: "9.98B", suffix: "(20.2% supply)", color: "#57a9ff" },
    ],
    liquidity: [
      { label: "Tokens", value: "5", suffix: "(0% supply)", color: "#efc18f" },
      { label: "Locked Tokens", value: "0", suffix: "(0% supply)", color: "#f5f0dc" },
    ],
  },
  contractSecurityMetrics: {
    score: 92,
    maxScore: 100,
    summary:
      "Overall smart contract safety score based on static analysis and manual review.",
    checks: [
      { label: "Reentrancy Protection", status: "Safe", tone: "safe" },
      { label: "Ownership Control", status: "Secure", tone: "safe" },
      { label: "Overflow Protection", status: "Safe", tone: "safe" },
      { label: "Proxy Pattern Safety", status: "Review", tone: "review" },
      { label: "Upgrade Authorization", status: "Missing", tone: "missing" },
      { label: "Emergency Pause", status: "Missing", tone: "missing" },
    ],
  },
  contractInformation: {
    tokenDetails: [
      { label: "Token Name", value: "LFUSD Coin" },
      { label: "Symbol", value: "LFUSD" },
      { label: "Standard", value: "ERC-20" },
      { label: "Decimals", value: "18" },
      { label: "Total Supply", value: "49,400,000,000" },
    ],
    deploymentDetails: [
      { label: "Deployer Address", value: "0x52a...91a", actionLabel: "Copy deployer address" },
      { label: "Contract Creator", value: "EOA", actionLabel: "Copy contract creator" },
      { label: "Verified Source", value: "Yes", actionLabel: "Copy verified source" },
      { label: "Compiler Version", value: "0.8.19", actionLabel: "Copy compiler version" },
      { label: "Optimization", value: "Enabled", actionLabel: "Copy optimization status" },
    ],
  },
  ownershipAndLiquidityRisk: {
    ownerControl: {
      value: "54.8%",
      subtitle: "Owner Control",
      progress: 54.8,
      holders: [
        { label: "Deploying Wallet", value: "8.00B", suffix: "(16.2%)", color: "#6eb8ff" },
        { label: "Staking Contract", value: "7.00B", suffix: "(14.2%)", color: "#f2b34d" },
        { label: "Exchange Wallets", value: "6.00B", suffix: "(12.1%)", color: "#f0a793" },
        { label: "Multi-Sig Wallet", value: "6.07B", suffix: "(12.3%)", color: "#a4c8ff" },
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
      leftValue: "0 ETH",
      rightValue: "0 ETH",
      subLabel: "0.0% of Liquidity Supply",
      rightPercent: "0.0%",
    },
  },
  holderDistributionAnalysis: {
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
        { label: "Whales", value: "27.07B", color: "#67d8ff", active: true },
        { label: "Large Holders", value: "12.95B", color: "#5a9bff" },
        { label: "Small Holders", value: "9.38B", color: "#61b6ff" },
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
      "Whale concentration remains elevated, with the largest holder cohort controlling more than half of the supply.",
  },
  transactionTaxAnalysis: {
    taxes: [
      {
        label: "Buy Tax",
        value: "1%",
        progress: 22,
        fillClassName:
          "bg-[linear-gradient(90deg,#39e3ff_0%,#2a9fc8_100%)] shadow-[0_0_18px_rgba(57,227,255,0.35)]",
      },
      {
        label: "Sell Tax",
        value: "1.5%",
        progress: 48,
        fillClassName:
          "bg-[linear-gradient(90deg,#56c8ff_0%,#5d86ff_100%)] shadow-[0_0_18px_rgba(86,200,255,0.32)]",
      },
      {
        label: "Transfer Tax",
        value: "9.0%",
        progress: 67,
        fillClassName:
          "bg-[linear-gradient(90deg,#214f9f_0%,#2c67ba_100%)] shadow-[0_0_18px_rgba(55,120,220,0.24)]",
      },
    ],
    breakdownRows: [
      {
        tax: "Tax",
        taxValue: "1%",
        buyLabel: "Buyer Development",
        buyValue: "0.5%",
        sellLabel: "Buyer Marketing",
        sellValue: "0.5%",
      },
      {
        tax: "Tax",
        taxValue: "1.5%",
        buyLabel: "Buyer Development",
        buyValue: "0.5%",
        sellLabel: "Fee Liquidity Pool",
        sellValue: "1.0%",
      },
    ],
    note:
      "The current tax is within a reasonable range. It is recommended to monitor any changes to tax parameters.",
    liquidityRisk: {
      title: "Liquidity Risk",
      topHolderTitle: "Top Liquidity Holder",
      holder: "OTW3...FF89",
      chipValue: "462.38 ETH",
      footerLabel: "92.4% of Total Liquidity",
      footerValue: "92.4%",
      progress: 92.4,
      lockedTitle: "Locked Liquidity",
      lockedLeftValue: "0 ETH",
      lockedRightValue: "0 ETH",
      lockedSubLabel: "0.0% of Liquidity Supply",
      lockedPercent: "0.0%",
    },
  },
  honeypotAndAntiWhale: {
    honeypot: {
      status: "No Honeypot Detected",
      checks: ["Sell Function Usable", "No External Fund Lock", "No Suspicious Code Detected"],
      note: "This contract does not exhibit any honeypot characteristics.",
    },
    antiWhale: {
      ringValue: "1B",
      ringSubtitle: "Tokens",
      progress: 2.0,
      title: "1B Tokens",
      subLabel: "Control",
      footerLeft: "2.0% of Total Supply",
      footerRight: "2.0%",
      baseValue: "1B Tokens",
      baseSubLabel: "Max transaction limit",
      statRows: [
        { label: "Transfer Limit", value: "2.0%", status: "Enabled" },
        { label: "Max Wallet Limit", value: "2.0%", status: "Enabled" },
        { label: "Max Transaction Limit", value: "1B", status: "Enabled" },
      ],
      note:
        "An anti-whale mechanism is in place to limit the impact of large token holders on the trade zones.",
    },
  },
  projectOverview: {
    title: "Milestone HODL Token",
    website: "dev-mht.github.io",
    description:
      "Milestone HODL Token (MHT) is a decentralized protocol on the BNB Smart Chain designed to transform market growth into automated rewards for holders.",
    actions: [
      { label: "Website", icon: "Globe" },
      { label: "Twitter", icon: "Link2" },
    ],
    badges: [
      { label: "BNB Chain", icon: "Hexagon", tone: "amber" },
      { label: "Chainlink Automation", icon: "Hexagon", tone: "indigo" },
      { label: "Automated", icon: "Zap", tone: "blue" },
    ],
    onboarded: "09 March 2026",
    verifiedLabel: "Security Verified",
  },
});

