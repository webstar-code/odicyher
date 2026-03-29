import Image from "next/image";

/**
 * Icons: public/images/landing/why/1.svg … 7.svg (or .png — update iconSrc).
 */
const REASONS: {
  title: string;
  lines: [string, string];
  iconSrc: string;
}[] = [
  {
    title: "Fast Audit Delivery (2-5 Days)",
    lines: [
      "Structured timelines without cutting corners on depth.",
      "Ideal for launches, listings, and community milestones.",
    ],
    iconSrc: "/images/landing/why/1.svg",
  },
  {
    title: "Free Re-Audit",
    lines: [
      "We re-check fixes after you patch reported issues.",
      "Keeps your deployment aligned with the final signed-off scope.",
    ],
    iconSrc: "/images/landing/why/2.svg",
  },
  {
    title: "KYC Verified Team",
    lines: [
      "Know who is behind the audit and their track record.",
      "Transparency builds trust with your holders and partners.",
    ],
    iconSrc: "/images/landing/why/3.svg",
  },
  {
    title: "NDA Available",
    lines: [
      "Protect strategy, tokenomics, and unreleased features.",
      "Standard for teams that need confidentiality before go-live.",
    ],
    iconSrc: "/images/landing/why/4.svg",
  },
  {
    title: "24/7 Support",
    lines: [
      "Reach us when incidents or questions can’t wait.",
      "Slack, Telegram, or email — aligned to your workflow.",
    ],
    iconSrc: "/images/landing/why/5.svg",
  },
  {
    title: "Affordable Pricing",
    lines: [
      "Clear scopes tied to codebase size and chain complexity.",
      "No surprise line items; you approve the plan up front.",
    ],
    iconSrc: "/images/landing/why/6.svg",
  },
  {
    title: "Post-Launch Monitoring",
    lines: [
      "Optional watch for upgrades, migrations, and new risks.",
      "Stay covered after the certificate hits your community.",
    ],
    iconSrc: "/images/landing/why/7.svg",
  },
];

const ICON = 40;

const STARFIELDS =
  "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.35), transparent)," +
  "radial-gradient(1px 1px at 48% 12%, rgba(255,255,255,0.22), transparent)," +
  "radial-gradient(1px 1px at 78% 28%, rgba(255,255,255,0.3), transparent)," +
  "radial-gradient(1px 1px at 30% 52%, rgba(255,255,255,0.18), transparent)," +
  "radial-gradient(1px 1px at 88% 58%, rgba(255,255,255,0.28), transparent)," +
  "radial-gradient(1px 1px at 55% 82%, rgba(255,255,255,0.2), transparent)," +
  "radial-gradient(2px 2px at 65% 40%, rgba(147,197,253,0.35), transparent)";

function ReasonCard({
  title,
  lines,
  iconSrc,
  index,
}: (typeof REASONS)[number] & { index: number }) {
  const isLast = index === REASONS.length - 1;

  return (
    <article
      className={`group flex gap-4 rounded-2xl border border-cyan-500/15 bg-[#010D23]/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/30 hover:shadow-[0_0_28px_rgba(34,211,238,0.08)] sm:gap-5 sm:p-5 ${
        isLast
          ? "md:col-span-2 md:max-w-xl md:justify-self-center lg:col-span-1 lg:col-start-2 lg:max-w-none"
          : ""
      }`}
    >
      <div
        className="flex size-[52px] shrink-0 items-center justify-center rounded-xl bg-cyan-500/5 shadow-[0_0_22px_rgba(34,211,238,0.22),inset_0_1px_0_rgba(255,255,255,0.06)]"
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
        <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#696E7D]">
          {lines[0]}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[#696E7D]">
          {lines[1]}
        </p>
      </div>
    </article>
  );
}

export function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden border-t border-cyan-500/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="why-choose-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#020617]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `${STARFIELDS}, radial-gradient(ellipse 90% 70% at 50% 100%, rgba(30,64,175,0.2), transparent 60%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#020617]/85 via-transparent to-[#020617]/90"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="why-choose-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Why Choose Us?
          </h2>
          <p className="mt-3 text-sm text-[#696E7D] sm:text-base">
            Key reasons to choose our audit services
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {REASONS.map((item, index) => (
            <ReasonCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
