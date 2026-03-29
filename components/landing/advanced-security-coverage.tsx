import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LANDING_OUTLINE_CTA_BUTTON } from "@/components/landing/landing-cta-classes";

const DASHBOARD_SRC = "/images/landing/advanced-security/dashboard.png";
const DASHBOARD_W = 1835;
const DASHBOARD_H = 1963;

const COVERAGE_ITEMS: {
  title: string;
  description: string;
  iconSrc: string;
}[] = [
  {
    title: "Submit Contract",
    description:
      "Securely share your codebase and deployment context so we can scope the right tests.",
    iconSrc: "/images/landing/advanced-security/items/submit-contract.svg",
  },
  {
    title: "Automated Security Tools",
    description:
      "Static analysis, fuzzing, and policy checks run in parallel to catch common issues fast.",
    iconSrc: "/images/landing/advanced-security/items/automated-security-tools.svg",
  },
  {
    title: "Rug Pull Detection",
    description:
      "Pattern scans for hidden mints, suspicious proxies, and liquidity manipulation vectors.",
    iconSrc: "/images/landing/advanced-security/items/rug-pull-detection.svg",
  },
  {
    title: "Vulnerability Report",
    description:
      "Clear severity, reproduction steps, and remediation guidance your devs can act on.",
    iconSrc: "/images/landing/advanced-security/items/vulnerability-report.svg",
  },
  {
    title: "Project Fix Issues",
    description:
      "We validate patches and updated bytecode before you ship to mainnet or DEX listings.",
    iconSrc: "/images/landing/advanced-security/items/project-fix-issues.svg",
  },
  {
    title: "Final Audit Certificate",
    description:
      "Publishable proof of review for communities, launchpads, and exchange due diligence.",
    iconSrc: "/images/landing/advanced-security/items/final-audit-certificate.svg",
  },
];

const ICON = 44;

export function AdvancedSecurityCoverage() {
  return (
    <section
      className="relative border-t border-cyan-500/10 bg-[#02091B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="advanced-coverage-heading"
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

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90 sm:text-xs">
            Global coverage
          </p>
          <h2
            id="advanced-coverage-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            Advanced Security Coverage Worldwide
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#696E7D] sm:text-base">
            One pipeline from first upload to signed-off certificate — built for teams shipping
            across chains and time zones.
          </p>
        </header>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#010D23]/80 shadow-[0_0_48px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,211,238,0.12),transparent)]"
              aria-hidden
            />
            <Image
              src={DASHBOARD_SRC}
              alt="Security operations dashboard preview"
              width={DASHBOARD_W}
              height={DASHBOARD_H}
              className="relative z-1 w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {COVERAGE_ITEMS.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-cyan-500/15 bg-[#010D23]/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/30 hover:shadow-[0_0_28px_rgba(34,211,238,0.08)] sm:p-5"
              >
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  aria-hidden
                >
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={ICON}
                    height={ICON}
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-3 text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#696E7D]">
                  {item.description}
                </p>
                <Link
                  href="#pricing"
                  className={`${LANDING_OUTLINE_CTA_BUTTON} mt-4`}
                >
                  Launch Now
                  <ChevronDown className="size-4 shrink-0 opacity-80" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
