import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LANDING_PRIMARY_CTA_BUTTON } from "@/components/landing/landing-cta-classes";
import { DEFAULT_BRAND_LOGO_SRC } from "@/lib/default-brand-logo";

const REPORTS: {
  title: string;
  subtitle?: string;
  bullets: string[];
  pdfHref: string;
}[] = [
  {
    title: "OxyFi Token",
    bullets: [
      "Lines of Code Limit",
      "Manual Review",
      "Auto Scan",
      "Detailed Audit",
    ],
    pdfHref: "/sample-report",
  },
  {
    title: "EtherSwap",
    bullets: [
      "Various Tests",
      "Manual Scan",
      "Detailed Report",
      "Free Re-Audit Included (after vulnerability fixes verification)",
    ],
    pdfHref: "/sample-report",
  },
  {
    title: "LunaShield",
    subtitle: "Contact Us for price",
    bullets: [
      "Security Score",
      "Manual Scan",
      "Detailed Report",
      "Free Re-Audit Included (after vulnerability fixes verification)",
    ],
    pdfHref: "/sample-report",
  },
];

const ICON = 48;

function ReportCard({
  title,
  subtitle,
  bullets,
  pdfHref,
}: (typeof REPORTS)[number]) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/15 bg-[#010D23]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/25">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-cyan-500/12 to-transparent"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex gap-4">
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/5 shadow-[0_0_22px_rgba(34,211,238,0.22)]"
            aria-hidden
          >
            <Image
              src={DEFAULT_BRAND_LOGO_SRC}
              alt=""
              width={ICON}
              height={ICON}
              className="object-contain"
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-[#B8C7D9]">{subtitle}</p> : null}
          </div>
        </div>

        <ul className="mt-6 flex-1 space-y-2.5">
          {bullets.map((line) => (
            <li
              key={line}
              className="flex gap-2.5 text-sm leading-snug text-[#B8C7D9]"
            >
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-slate-400/80"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>

        <Link href={pdfHref} className={`${LANDING_PRIMARY_CTA_BUTTON} mt-8`}>
          <Download className="size-5 shrink-0 text-white" aria-hidden />
          Download PDF
        </Link>
      </div>
    </article>
  );
}

export function LatestAuditReports() {
  return (
    <section
      className="relative border-t border-cyan-500/10 bg-[#010D23] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="latest-reports-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="latest-reports-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Latest Audit Reports
          </h2>
          <p className="mt-3 text-sm text-[#B8C7D9] sm:text-base">
            Recent blockchain projects we&apos;ve audited
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {REPORTS.map((r) => (
            <ReportCard key={r.title} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
