import Link from "next/link";

export default function AdminHomePage() {
  return (
    <section className="w-full">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-slate-50">Admin dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage audit reports and other content.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h2 className="text-sm font-medium text-slate-100">Audit reports</h2>
        <p className="mt-1 text-xs text-slate-400">
          View and edit smart contract audit summary pages.
        </p>

        <div className="mt-4">
          <Link
            href="/admin/audit-reports"
            className="inline-flex items-center rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-700"
          >
            Go to audit reports
          </Link>
        </div>
      </div>
    </section>
  );
}

