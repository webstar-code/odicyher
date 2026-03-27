import Image from "next/image";

/**
 * Partner logos: public/images/landing/partners/1.svg … 6.svg (or .png — update iconSrc).
 */
const PARTNERS: { name: string; iconSrc: string }[] = [
  { name: "DeFi Protocol", iconSrc: "/images/landing/partners/1.png" },
  { name: "MoonFi Finance", iconSrc: "/images/landing/partners/2.png" },
  { name: "Blockverse Labs", iconSrc: "/images/landing/partners/3.png" },
  { name: "Aurora Token", iconSrc: "/images/landing/partners/4.png" },
  { name: "NextGen DeFi", iconSrc: "/images/landing/partners/5.png" },
  { name: "Cosmic Swap", iconSrc: "/images/landing/partners/6.png" },
];

const ICON = 48;

function PartnerCard({ name, iconSrc }: (typeof PARTNERS)[number]) {
  return (
    <article className="group flex min-h-18 items-center gap-3 rounded-2xl border border-cyan-500/15 bg-[#010D23]/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/30 hover:shadow-[0_0_28px_rgba(34,211,238,0.08)] sm:gap-3.5 sm:p-4">
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]"
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
      <p className="min-w-0 text-sm font-semibold uppercase tracking-wide text-[#838997]">
        {name}
      </p>
    </article>
  );
}

export function TrustedBy() {
  return (
    <section
      className="relative border-t border-cyan-500/10 bg-[#02091B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="trusted-by-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="trusted-by-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Trusted By Blockchain Projects Worldwide
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-3">
          {PARTNERS.map((p) => (
            <PartnerCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
