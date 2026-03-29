import Image from "next/image";

/**
 * Photos: public/images/landing/team/person-1.svg … person-4.svg (or mark.png, etc.).
 */
const TEAM: {
  name: string;
  role: string;
  imageSrc: string;
  bullets: [string, string];
}[] = [
  {
    name: "Mark Johnson",
    role: "Smart Contract Auditor",
    imageSrc: "/images/landing/team/person-1.svg",
    bullets: [
      "5+ Years in Solidity Security",
      "10+ Years in Security",
    ],
  },
  {
    name: "Sarah White",
    role: "Security Researcher",
    imageSrc: "/images/landing/team/person-2.svg",
    bullets: [
      "6+ Years in Cyber Security",
      "Web3 vulnerability research & tooling",
    ],
  },
  {
    name: "Jason Lee",
    role: "Blockchain Developer",
    imageSrc: "/images/landing/team/person-3.svg",
    bullets: [
      "2+ Years in Blockchain Development",
      "Protocol engineering with a security lens",
    ],
  },
  {
    name: "Laura Kim",
    role: "Penetration Tester",
    imageSrc: "/images/landing/team/person-4.svg",
    bullets: [
      "9+ Years in Web3 Security",
      "5+ Years in Web Security",
    ],
  },
];

const IMG_W = 362;
const IMG_H = 242;

const STARFIELDS =
  "radial-gradient(1px 1px at 10% 22%, rgba(255,255,255,0.32), transparent)," +
  "radial-gradient(1px 1px at 42% 14%, rgba(255,255,255,0.2), transparent)," +
  "radial-gradient(1px 1px at 72% 32%, rgba(255,255,255,0.28), transparent)," +
  "radial-gradient(1px 1px at 28% 58%, rgba(255,255,255,0.16), transparent)," +
  "radial-gradient(1px 1px at 90% 48%, rgba(255,255,255,0.24), transparent)," +
  "radial-gradient(1px 1px at 52% 78%, rgba(255,255,255,0.18), transparent)," +
  "radial-gradient(2px 2px at 60% 42%, rgba(147,197,253,0.32), transparent)";

function TeamCard({
  name,
  role,
  imageSrc,
  bullets,
}: (typeof TEAM)[number]) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#010D23]/90 shadow-[0_0_32px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-cyan-400/35 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
      <div className="relative aspect-3/2 w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_90%_at_50%_85%,rgba(34,211,238,0.35),transparent_65%),radial-gradient(ellipse_60%_70%_at_50%_20%,rgba(56,189,248,0.2),transparent_55%)]"
          aria-hidden
        />
        <Image
          src={imageSrc}
          alt=""
          width={IMG_W}
          height={IMG_H}
          className="relative z-1 h-full w-full object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center sm:px-5 sm:pb-6 sm:pt-5">
        <h3 className="text-lg font-bold text-white sm:text-xl">{name}</h3>
        <p className="mt-1 text-sm text-[#696E7D]">{role}</p>
        <ul className="mx-auto mt-4 max-w-68 space-y-2 text-left">
          {bullets.map((line) => (
            <li
              key={line}
              className="flex gap-2.5 text-xs leading-snug text-[#838997] sm:text-[13px]"
            >
              <span
                className="mt-1.5 size-1.5 shrink-0 bg-white/90"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function MeetOurTeam() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden border-t border-cyan-500/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="meet-team-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#020617]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage: `${STARFIELDS}, radial-gradient(ellipse 100% 65% at 50% 0%, rgba(30,64,175,0.22), transparent 55%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#020617]/88 via-transparent to-[#020617]/92"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="meet-team-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Meet Our Experienced Team
          </h2>
          <p className="mt-3 text-sm text-[#696E7D] sm:text-base">
            Our expert team of blockchain security professionals
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {TEAM.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
