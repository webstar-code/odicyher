import Image from "next/image";

/**
 * Card icons: replace files under public/images/landing/services/
 * (1.svg → 1.png, or edit `iconSrc` below). Recommended size ~64×64.
 */
const SERVICES: {
  title: string;
  description: string;
  iconSrc: string;
}[] = [
  {
    title: "Smart Contract Audit",
    description: "In-depth analysis of smart contract vulnerabilities.",
    iconSrc: "/images/landing/services/1.png",
  },
  {
    title: "Token Audit",
    description: "Full token security & rug risk analysis.",
    iconSrc: "/images/landing/services/2.png",
  },
  {
    title: "Liquidity Audit",
    description: "Liquidity lock & risk assessment.",
    iconSrc: "/images/landing/services/3.png",
  },
  {
    title: "KYC Verification",
    description: "Team identity verification.",
    iconSrc: "/images/landing/services/4.png",
  },
  {
    title: "Penetration Testing",
    description: "Website & server security testing.",
    iconSrc: "/images/landing/services/5.png",
  },
  {
    title: "Tokenomics Audit",
    description: "Token supply, tax & distribution review.",
    iconSrc: "/images/landing/services/6.png",
  },
];

const ICON_SIZE = 56;

function ServiceCard({
  title,
  description,
  iconSrc,
}: (typeof SERVICES)[number]) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-cyan-500/15 bg-[#010D23]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/30 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)] sm:p-5">
      <div className="relative shrink-0">
        <div
          className="flex size-[72px] items-center justify-center rounded-xl"
          aria-hidden
        >
          <Image
            src={iconSrc}
            alt=""
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="object-contain"
          />
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </article>
  );
}

export function SecurityServices() {
  return (
    <section
      id="services"
      className="relative border-t border-cyan-500/10 bg-[#02091B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 scroll-mt-20"
      aria-labelledby="security-services-heading"
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
            id="security-services-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Our Security Services
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Comprehensive security solutions for your blockchain project.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
