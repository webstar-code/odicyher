import type { AuditReport } from "@/types/audit-report";

/**
 * Runtime helper for working with audit report data.
 *
 * For now this is a thin wrapper that simply ensures the value
 * conforms to the TypeScript `AuditReport` shape at compile-time.
 * We can extend this later with real runtime validation (e.g. zod).
 */
export function createAuditReport(report: AuditReport): AuditReport {
  return report;
}

export type { AuditReport } from "@/types/audit-report";

