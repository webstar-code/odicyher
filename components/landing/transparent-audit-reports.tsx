import { ClipboardCheck, Code2, Eye, FileSearch, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Swap this asset for your audit dashboard mockup (same path or update here). */
const DASHBOARD_SRC = "/images/landing/audit-report-dashboard.png";
const DASHBOARD_W = 1536;
const DASHBOARD_H = 1024;

const REPORT_FEATURES = [
  {
    title: "Detailed Vulnerability Breakdown",
    description:
      "Every issue is clearly identified, classified, and explained with its potential impact.",
    icon: FileSearch,
  },
  {
    title: "Manual & Automated Review",
    description:
      "Our experts perform in-depth manual analysis along with advanced security tools.",
    icon: Code2,
  },
  {
    title: "Fix Recommendations",
    description:
      "We provide clear and actionable steps to resolve each identified issue.",
    icon: ClipboardCheck,
  },
  {
    title: "Re-Audit Verification",
    description:
      "We re-verify the contract after fixes to ensure all critical issues are properly addressed.",
    icon: RefreshCcw,
  },
] as const;

export function TransparentAuditReports() {
  return (
    <section
      id="audit-reports"
      className="relative scroll-mt-20 border-t border-cyan-500/10 bg-[#02091B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="transparent-reports-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative order-2 lg:order-1">
          <div
            className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none"
            style={{ perspective: "00px" }}
          >
            <div className="max-md:transform-none md:transform-[rotateY(0deg)_rotateX(0deg)]">
              <div
                className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(34,211,238,0.22), transparent 65%)",
                }}
                aria-hidden
              />
              <Image
                src={DASHBOARD_SRC}
                alt="Sample audit report dashboard with score, findings, and audit details"
                width={DASHBOARD_W}
                height={DASHBOARD_H}
                className="h-auto w-full rounded-2xl object-contain shadow-[0_0_48px_rgba(34,211,238,0.15),0_24px_48px_rgba(0,0,0,0.35)]"
                sizes="(max-width: 1024px) min(100vw - 2rem, 640px), 45vw"
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2
            id="transparent-reports-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[1.75rem] xl:text-3xl"
          >
            Transparent &amp; Detailed Audit Reports
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#B8C7D9] sm:text-base">
            We provide clear, detailed, and transparent reports so you know
            exactly what&apos;s secure and what needs to be fixed.
          </p>

          <ul className="mt-8 space-y-5">
            {REPORT_FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.16)]"
                  aria-hidden
                >
                  <feature.icon className="size-5 text-cyan-100" strokeWidth={2.25} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#B8C7D9] sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/sample-report"
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/45 bg-linear-to-b from-[#0C6ACD] to-[#01267E] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.12)] transition-[border-color,box-shadow,background-color] hover:border-cyan-300/60 hover:bg-[#061a2c] hover:shadow-[0_0_36px_rgba(34,211,238,0.2)] sm:w-auto sm:text-base"
          >
            <Eye className="size-5 shrink-0 text-cyan-200" aria-hidden />
            View Full Report (PDF)
          </Link>
        </div>
      </div>
    </section>
  );
}
