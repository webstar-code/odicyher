import Image from "next/image";

/**
 * Logos: public/images/landing/integrations/*.svg (or .png — update logoSrc).
 */
const PARTNERS: { name: string; logoSrc: string }[] = [
  { name: "PinkSale", logoSrc: "/images/landing/integrations/pinksale.svg" },
  { name: "DxSale", logoSrc: "/images/landing/integrations/dxsale.svg" },
  { name: "Unicrypt", logoSrc: "/images/landing/integrations/unicrypt.svg" },
  {
    name: "Team Finance",
    logoSrc: "/images/landing/integrations/team-finance.svg",
  },
  { name: "CoinGecko", logoSrc: "/images/landing/integrations/coingecko.svg" },
];

const LOGO = 48;

export function TrustedPartnersIntegrations() {
  return (
    <section
      className="relative border-t border-cyan-500/10 bg-[#010D23] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="trusted-partners-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="trusted-partners-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Trusted Partners &amp; Integrations
          </h2>
          <p className="mt-3 text-sm text-[#696E7D] sm:text-base">
            We partner and integrate with top DeFi platforms.
          </p>
        </header>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex min-w-[140px] items-center gap-3 rounded-xl border border-cyan-500/15 bg-[#010D23]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] sm:min-w-0 sm:px-5"
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                aria-hidden
              >
                <Image
                  src={p.logoSrc}
                  alt=""
                  width={LOGO}
                  height={LOGO}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-white sm:text-base">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
