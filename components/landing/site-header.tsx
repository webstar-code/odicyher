import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#audit-reports", label: "Audit Reports" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-cyan-500/10 bg-[#000616] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/30">
            <Image
              src="/images/logo.svg"
              alt="ODICYBER"
              width={44}
              height={44}
              className="size-full object-cover"
              priority
            />
          </div>
          <div className="min-w-0 text-left leading-tight">
            <span className="block font-semibold tracking-wide text-white">
              ODICYBER
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:text-[11px]">
              Blockchain Security &amp; Audit
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex lg:gap-2"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const isHome = item.href === "/";
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isHome
                    ? "text-white"
                    : "text-slate-400 hover:text-cyan-200"
                }`}
              >
                {item.label}
                {isHome ? (
                  <span
                    className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="#contact"
            className="rounded-sm bg-linear-to-b from-[#0C6ACD] to-[#01267E] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-[transform,box-shadow] hover:shadow-[0_0_32px_rgba(34,211,238,0.5)] active:scale-[0.98] sm:px-5"
          >
            Request Audit
          </Link>
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-cyan-500/10 px-4 py-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Primary mobile"
      >
        {nav.map((item) => {
          const isHome = item.href === "/";
          return (
            <Link
              key={`m-${item.href}-${item.label}`}
              href={item.href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
                isHome
                  ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/30"
                  : "text-slate-400"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
