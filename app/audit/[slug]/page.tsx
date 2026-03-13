import { notFound } from "next/navigation";

import { AuditSummary } from "@/components/audit-summary";
import { getPublishedAuditReportBySlug } from "@/lib/audit-reports-repository";

interface AuditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuditPage({ params }: AuditPageProps) {
  const { slug } = await params;
  const record = await getPublishedAuditReportBySlug(slug);

  if (!record) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0a1525_0%,#0d1b2e_30%,#0a1525_100%)]">
      <AuditSummary data={record.content} />
    </main>
  );
}
