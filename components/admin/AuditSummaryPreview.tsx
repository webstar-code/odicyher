"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  PREVIEW_MESSAGE_TYPE,
  PREVIEW_READY_TYPE,
} from "@/lib/preview-constants";
import type { AuditReport } from "@/types/audit-report";

interface AuditSummaryPreviewProps {
  data: AuditReport;
}

function sendPreviewData(target: Window, data: AuditReport) {
  target.postMessage(
    { type: PREVIEW_MESSAGE_TYPE, payload: data },
    window.location.origin
  );
}

export function AuditSummaryPreview({ data }: AuditSummaryPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    sendPreviewData(iframe.contentWindow, data);
  }, [data]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.data?.type === PREVIEW_READY_TYPE && iframeRef.current?.contentWindow) {
        sendPreviewData(iframeRef.current.contentWindow, data);
      }
    },
    [data]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <div className="h-[72vh] min-h-[520px] overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <iframe
        ref={iframeRef}
        src="/preview"
        title="Live preview"
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
