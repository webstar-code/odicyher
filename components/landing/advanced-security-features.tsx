import Image from "next/image";

/**
 * Icons: public/images/landing/features/1.svg … 6.svg (or .png — update iconSrc).
 */
const FEATURES: { title: string; iconSrc: string }[] = [
  {
    title: "Manual Code Review",
    iconSrc: "/images/landing/features/1.png",
  },
  {
    title: "Automated Security Tools",
    iconSrc: "/images/landing/features/2.png",
  },
  {
    title: "Rug Pull Risk Detection",
    iconSrc: "/images/landing/features/3.png",
  },
  {
    title: "Liquidity Lock Verification",
    iconSrc: "/images/landing/features/4.png",
  },
  {
    title: "Ownership Privileges Check",
    iconSrc: "/images/landing/features/5.png",
  },
  {
    title: "Honeypot Detection",
    iconSrc: "/images/landing/features/6.png",
  },
];

const ICON = 32;

function FeatureCard({
  title,
  iconSrc,
}: (typeof FEATURES)[number]) {
  return (
    <article className="group flex min-h-18 items-center gap-3 rounded-2xl border border-cyan-500/15 bg-[#010D23]/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/30 hover:shadow-[0_0_28px_rgba(34,211,238,0.08)] sm:gap-3.5 sm:p-4">
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]"
        aria-hidden
      >
        <Image
          src={iconSrc}
          alt=""
          width={ICON}
          height={ICON}
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-[#74798B]">
          {title}
        </h3>
      </div>
    </article>
  );
}

export function AdvancedSecurityFeatures() {
  return (
    <section
      className="relative border-t border-cyan-500/10 bg-[#02091B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="advanced-features-heading"
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
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="advanced-features-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Advanced Security Features
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
