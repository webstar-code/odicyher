import Link from "next/link";

import { getAuditReportsForAdmin } from "@/lib/audit-reports-repository";
import { createAuditReport } from "./actions";

export default async function AuditReportsListPage() {
  const reports = await getAuditReportsForAdmin();

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">Audit reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Browse and open audit reports for editing.
          </p>
        </div>
        <form action={createAuditReport}>
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-sky-600 bg-sky-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-600"
          >
            New report
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <table className="min-w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Slug</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Updated</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-xs text-slate-500"
                >
                  No audit reports found yet. Seed your first report in Supabase to
                  see it here.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t border-slate-800/80 hover:bg-slate-800/40"
                >
                  <td className="px-4 py-2 align-middle text-xs text-slate-100">
                    {report.title}
                  </td>
                  <td className="px-4 py-2 align-middle text-[11px] text-slate-400">
                    {report.slug}
                  </td>
                  <td className="px-4 py-2 align-middle">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        report.status === "published"
                          ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40"
                          : "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 align-middle text-[11px] text-slate-400">
                    {new Date(report.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 align-middle text-[11px]">
                    <span className="flex items-center gap-3">
                      <Link
                        href={`/admin/audit-reports/${encodeURIComponent(report.slug)}`}
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Edit
                      </Link>
                      {report.status === "published" && (
                        <Link
                          href={`/audit/${encodeURIComponent(report.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-300"
                        >
                          Preview
                        </Link>
                      )}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

