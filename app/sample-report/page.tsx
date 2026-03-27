import { AuditSummary } from "@/components/audit-summary";
import { defaultAuditReport } from "@/lib/default-audit-report";

export default function SampleReportPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0a1525_0%,#0d1b2e_30%,#0a1525_100%)]">
      <AuditSummary data={defaultAuditReport} />
    </main>
  );
}
