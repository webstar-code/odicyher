import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin-auth";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="text-sm font-semibold tracking-[0.18em] text-slate-300 uppercase">
            Admin
          </div>
          <div className="text-xs text-slate-400">Audit Reports Panel</div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl gap-6 px-6 py-6">{children}</main>
    </div>
  );
}

