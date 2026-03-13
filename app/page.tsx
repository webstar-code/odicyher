import { AuditSummary } from "@/components/audit-summary";
import { getPublishedAuditReportBySlug } from "@/lib/audit-reports-repository";
import { defaultAuditReport } from "@/lib/default-audit-report";

interface HomeProps {
  searchParams: Promise<{ report?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { report } = await searchParams;
  const slug = report ?? "default-audit";
  const record = await getPublishedAuditReportBySlug(slug);
  const data = record?.content ?? defaultAuditReport;

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0a1525_0%,#0d1b2e_30%,#0a1525_100%)]">
      <AuditSummary data={data} />
    </main>
  );
}
