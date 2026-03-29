import Image from "next/image";

/**
 * Chain logos: ethereum.svg, bnb.svg, polygon.svg, solana.svg, tron.svg, arbitrum.svg, optimism.svg
 */
const CHAINS_ROW1: {
  name: string;
  logoSrc: string;
  variant?: "tron" | "optimism";
}[] = [
  { name: "Ethereum", logoSrc: "/images/landing/chains/ethereum.svg" },
  { name: "BNBCHAIN", logoSrc: "/images/landing/chains/bnb.svg" },
  { name: "POLYGON", logoSrc: "/images/landing/chains/polygon.svg" },
  { name: "SOLANA", logoSrc: "/images/landing/chains/solana.svg" },
];

const CHAINS_ROW2: {
  name: string;
  logoSrc: string;
  variant?: "tron" | "optimism";
}[] = [
  { name: "TRON", logoSrc: "/images/landing/chains/tron.svg", variant: "tron" },
  { name: "ARBITRUM", logoSrc: "/images/landing/chains/arbitrum.svg" },
  {
    name: "OPTIMISM",
    logoSrc: "/images/landing/chains/optimism.svg",
    variant: "optimism",
  },
];

const LOGO = 40;

const STARFIELDS =
  "radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.45), transparent)," +
  "radial-gradient(1px 1px at 22% 28%, rgba(255,255,255,0.3), transparent)," +
  "radial-gradient(1px 1px at 38% 8%, rgba(255,255,255,0.35), transparent)," +
  "radial-gradient(1px 1px at 55% 22%, rgba(255,255,255,0.25), transparent)," +
  "radial-gradient(1px 1px at 72% 14%, rgba(255,255,255,0.4), transparent)," +
  "radial-gradient(1px 1px at 88% 32%, rgba(255,255,255,0.3), transparent)," +
  "radial-gradient(1px 1px at 15% 55%, rgba(255,255,255,0.35), transparent)," +
  "radial-gradient(1px 1px at 42% 48%, rgba(255,255,255,0.2), transparent)," +
  "radial-gradient(1px 1px at 65% 62%, rgba(255,255,255,0.38), transparent)," +
  "radial-gradient(1px 1px at 92% 58%, rgba(255,255,255,0.28), transparent)," +
  "radial-gradient(1px 1px at 28% 78%, rgba(255,255,255,0.32), transparent)," +
  "radial-gradient(1px 1px at 50% 88%, rgba(255,255,255,0.22), transparent)," +
  "radial-gradient(1px 1px at 78% 82%, rgba(255,255,255,0.36), transparent)," +
  "radial-gradient(2px 2px at 33% 38%, rgba(147,197,253,0.5), transparent)," +
  "radial-gradient(1px 1px at 81% 72%, rgba(255,255,255,0.3), transparent)";

function ChainCell({
  name,
  logoSrc,
  variant,
}: (typeof CHAINS_ROW1)[number]) {
  const isOptimism = variant === "optimism";
  const isTron = variant === "tron";

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/25 ${
        isOptimism
          ? "border-red-500/25 bg-[#0a0f18]/90 shadow-[0_0_28px_rgba(239,68,68,0.2)]"
          : isTron
            ? "border-red-500/20 bg-[#0a0f18]/90 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.08)]"
            : "border-cyan-500/15 bg-[#010D23]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      } `}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg`}
        aria-hidden
      >
        <Image
          src={logoSrc}
          alt=""
          width={LOGO}
          height={LOGO}
          className="object-contain"
        />
      </div>
      <span className="text-sm font-semibold tracking-wide text-white">
        {name}
      </span>
    </div>
  );
}

export function SupportedNetworks() {
  return (
    <section
      className="relative overflow-hidden border-t border-cyan-500/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="supported-networks-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#020617]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65]"
        style={{
          backgroundImage: `${STARFIELDS}, radial-gradient(ellipse 100% 80% at 50% 100%, rgba(30,64,175,0.25), transparent 55%), radial-gradient(ellipse 70% 50% at 20% 0%, rgba(34,211,238,0.08), transparent 50%)`,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#020617]/80 via-transparent to-[#020617]/90"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <h2
          id="supported-networks-heading"
          className="text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm"
        >
          We support all major blockchain networks
        </h2>

        <div className="mt-10 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CHAINS_ROW1.map((c) => (
              <ChainCell key={c.name} {...c} />
            ))}
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {CHAINS_ROW2.map((c) => (
              <ChainCell key={c.name} {...c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
