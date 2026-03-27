import { Quote, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

const TESTIMONIALS: { quote: string; attribution: string }[] = [
  {
    quote:
      "ODICYBER delivered a thorough audit with clear findings and actionable fixes. We shipped with confidence knowing our contracts were reviewed by real security engineers.",
    attribution: "DeFi Project Owner",
  },
  {
    quote:
      "Fast turnaround, professional report, and great communication throughout. Our community trusted the audit badge immediately after launch.",
    attribution: "Token Founder",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-amber-400 text-amber-400"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export function TestimonialsCta() {
  return (
    <section
      className="relative border-t border-cyan-500/10 bg-[#010D23] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className="lg:col-span-7">
          <h2
            id="testimonials-heading"
            className="text-center text-2xl font-bold tracking-tight text-white sm:text-left sm:text-3xl"
          >
            What Our Clients Say
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.attribution}
                className="flex h-full flex-col rounded-2xl border border-cyan-500/20 bg-[#010D23]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm"
              >
                <Quote
                  className="size-8 shrink-0 text-cyan-400/80"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {t.quote}
                </p>
                <div className="mt-4">
                  <StarRow />
                  <footer className="mt-3 text-xs text-[#696E7D]">
                    — {t.attribution}
                  </footer>
                </div>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="flex lg:col-span-5">
          <div
            id="pricing"
            className="flex w-full scroll-mt-20 flex-col justify-center rounded-2xl border-2 border-cyan-400/40 bg-[#010D23]/80 p-8 shadow-[0_0_40px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-10"
          >
            <h3 className="text-center text-xl font-bold text-white sm:text-2xl">
              Ready To Secure Your Project?
            </h3>
            <p className="mt-3 text-center text-sm leading-relaxed text-[#696E7D] sm:text-base">
              Don&apos;t take risks with your smart contract. Get it audited by
              experts.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#0C6ACD] to-[#01267E] px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_32px_rgba(34,211,238,0.35)] transition-[transform,box-shadow] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] active:scale-[0.99]"
            >
              <ShieldCheck className="size-5 shrink-0 text-white" aria-hidden />
              Request Audit Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
