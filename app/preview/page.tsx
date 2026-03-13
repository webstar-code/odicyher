"use client";

import { useCallback, useEffect, useState } from "react";

import { AuditSummary } from "@/components/audit-summary";
import type { AuditReport } from "@/types/audit-report";
import {
  PREVIEW_MESSAGE_TYPE,
  PREVIEW_READY_TYPE,
} from "@/lib/preview-constants";

export default function PreviewPage() {
  const [data, setData] = useState<AuditReport | null>(null);

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: PREVIEW_READY_TYPE }, "*");
    }
  }, []);

  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type !== PREVIEW_MESSAGE_TYPE) return;
    const payload = event.data.payload;
    if (payload && typeof payload === "object") {
      setData(payload as AuditReport);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a1525]">
        <p className="text-sm text-slate-500">
          Waiting for preview data from editor…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0a1525_0%,#0d1b2e_30%,#0a1525_100%)]">
      <AuditSummary data={data} />
    </main>
  );
}
