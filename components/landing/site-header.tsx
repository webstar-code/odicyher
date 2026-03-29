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
      <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 transition-opacity hover:opacity-90 sm:flex-initial sm:gap-3"
        >
          <div className="relative size-9 shrink-0 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/30 sm:size-11">
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
            <span className="block truncate text-sm font-semibold tracking-wide text-white sm:text-base">
              ODICYBER
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:block sm:text-[11px]">
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

        <div className="flex shrink-0 items-center">
          <Link
            href="#contact"
            className="whitespace-nowrap rounded-sm bg-linear-to-b from-[#0C6ACD] to-[#01267E] px-2.5 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-[transform,box-shadow] hover:shadow-[0_0_32px_rgba(34,211,238,0.5)] active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
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
