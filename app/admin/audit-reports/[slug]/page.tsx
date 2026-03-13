import { notFound } from "next/navigation";

import { getAuditReportBySlugForAdmin } from "@/lib/audit-reports-repository";
import { AuditReportEditor } from "@/components/admin/AuditReportEditor";

interface AuditReportEditorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuditReportEditorPage({
  params,
}: AuditReportEditorPageProps) {
  const { slug } = await params;
  const record = await getAuditReportBySlugForAdmin(slug);

  if (!record) {
    notFound();
  }

  return <AuditReportEditor initialRecord={record} slug={slug} />;
}

