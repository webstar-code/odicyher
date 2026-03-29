import { ChevronDown, Star } from "lucide-react";
import Link from "next/link";

import {
  LANDING_OUTLINE_CTA_BUTTON,
  LANDING_PRIMARY_CTA_BUTTON,
} from "@/components/landing/landing-cta-classes";

function StarRow() {
  return (
    <div className="flex justify-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-sky-400/85 text-sky-400"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

const PLANS: {
  name: string;
  price?: string;
  highlighted?: boolean;
  features: string[];
}[] = [
  {
    name: "Basic Scanner",
    features: [
      "Automated static analysis on standard EVM contracts",
      "Summary risk score and top findings",
      "Exportable report for internal review",
      "Email support within business hours",
    ],
  },
  {
    name: "Standard Audit",
    features: [
      "Everything in Basic Scanner",
      "Manual review of critical paths",
      "Medium-depth threat modeling",
      "Two revision rounds on fixes",
    ],
  },
  {
    name: "Premium Audit",
    price: "$1999",
    highlighted: true,
    features: [
      "Full manual + automated coverage",
      "Dedicated lead auditor",
      "Executive summary for investors",
      "Priority channel & faster turnaround",
    ],
  },
  {
    name: "Holder Analyzer",
    features: [
      "Distribution and concentration metrics",
      "Whale and contract wallet tagging",
      "Snapshot-friendly CSV exports",
    ],
  },
  {
    name: "Liquidity Lock Checker",
    features: [
      "LP lock duration and beneficiary checks",
      "Router and pair integrity validation",
      "Plain-language summary for communities",
      "Re-check after pool migrations",
    ],
  },
];

export function PricingPlans() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 border-t border-cyan-500/10 bg-[#010D23] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="pricing-plans-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 50% 80%, rgba(255,255,255,0.15), transparent)
          `,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-cyan-500/25 bg-[#051a2c] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/95 sm:text-xs">
            Pricing plans
          </p>
          <h2
            id="pricing-plans-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            Powerful DAPP Security Tools
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#696E7D] sm:text-base">
            Pick the depth that matches your launch: from quick scans to full audits and
            ongoing tooling — all with clear deliverables.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border bg-[#010D23]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-6 ${
                plan.highlighted
                  ? "border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400/30"
                  : "border-cyan-500/15 transition-[border-color,box-shadow] hover:border-cyan-400/25"
              }`}
            >
              <StarRow />
              <h3 className="mt-4 text-center text-lg font-bold text-white">
                {plan.name}
              </h3>
              {plan.price ? (
                <p className="mt-2 text-center text-2xl font-bold tabular-nums text-white">
                  {plan.price}
                </p>
              ) : (
                <div className="mt-2 h-8" aria-hidden />
              )}

              <ul className="mt-5 flex-1 space-y-3">
                {plan.features.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 text-left text-xs leading-snug text-[#838997] sm:text-sm"
                  >
                    <span
                      className="mt-1.5 size-2 shrink-0 bg-sky-400/90"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>

              {plan.highlighted ? (
                <Link
                  href="#contact"
                  className={`${LANDING_PRIMARY_CTA_BUTTON} mt-6`}
                >
                  Get started
                  <ChevronDown className="size-4 shrink-0" aria-hidden />
                </Link>
              ) : (
                <Link
                  href="#contact"
                  className={`${LANDING_OUTLINE_CTA_BUTTON} mt-6`}
                >
                  Launch Now
                  <ChevronDown className="size-4 shrink-0 opacity-80" aria-hidden />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
