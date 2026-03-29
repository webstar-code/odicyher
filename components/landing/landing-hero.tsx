import { Bug, FileText, Lock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE_WIDTH = 1536;
const HERO_IMAGE_HEIGHT = 1024;

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 size-[420px] rounded-full bg-[#010717] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 size-[380px] rounded-full bg-blue-600/15 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            Blockchain Security &amp;{" "}
            <span className="bg-linear-to-b from-[#0C6ACD] to-[#0C6ACD] bg-clip-text text-transparent">
              Smart Contract Audits
            </span>
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-200 sm:text-xl">
            Protect Your Project Before Launch
          </p>
          <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
            Get Your Smart Contract Audited by Security Experts.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#0C6ACD] to-[#01267E] px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_32px_rgba(34,211,238,0.35)] transition-[transform,box-shadow] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] active:scale-[0.99]"
            >
              <ShieldCheck className="size-5 shrink-0" aria-hidden />
              Request Audit
            </Link>
            <Link
              href="/sample-report"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-[#0a1220]/80 px-6 py-3.5 text-base font-semibold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.08)] backdrop-blur-sm transition-colors hover:border-cyan-300/70 hover:bg-cyan-500/10"
            >
              <FileText className="size-5 shrink-0 text-cyan-300" aria-hidden />
              View Sample Report
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 divide-y divide-cyan-500/15 rounded-2xl border border-cyan-500/20 bg-white/4 p-4 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-0">
            <div className="flex items-center gap-3 px-4 py-3 sm:py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                <ShieldCheck className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                  100+
                </p>
                <p className="text-xs text-slate-500">Audits Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 sm:py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                <Lock className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                  $50M+
                </p>
                <p className="text-xs text-slate-500">Market Cap Secured</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 sm:py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.25)]">
                <Bug className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                  500+
                </p>
                <p className="text-xs text-slate-500">Vulnerabilities Found</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 w-full min-h-0 lg:mt-0 lg:pl-4">
          <div
            className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none"
            style={{ perspective: "1200px" }}
          >
            <div className="relative max-md:transform-none md:transform-[rotateY(-6deg)_rotateX(4deg)]">
              <div
                className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(34,211,238,0.25), transparent 65%)",
                }}
                aria-hidden
              />
              <Image
                src="/images/hero-image.png"
                alt="ODICYBER smart contract audit summary dashboard preview"
                width={HERO_IMAGE_WIDTH}
                height={HERO_IMAGE_HEIGHT}
                className="relative z-1 h-auto w-full rounded-2xl border border-cyan-400/25 object-contain shadow-[0_0_48px_rgba(34,211,238,0.15),0_24px_48px_rgba(0,0,0,0.35)] md:object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
