import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, Send } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#audit-reports", label: "Audit Reports" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Disclaimer" },
  { href: "#", label: "Audit Methodology" },
] as const;

const social = [
  {
    href: "https://t.me/",
    label: "Telegram",
    icon: Send,
  },
  {
    href: "https://twitter.com/",
    label: "X",
    icon: XIcon,
  },
  {
    href: "https://linkedin.com/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:audit@odicyber.com",
    label: "Email",
    icon: Mail,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-cyan-500/10 bg-[#000616] px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/30">
                <Image
                  src="/images/logo.svg"
                  alt="ODICYBER"
                  width={48}
                  height={48}
                  className="size-full object-cover"
                />
              </div>
              <div className="text-left leading-tight">
                <span className="block font-bold tracking-wide text-white">
                  ODICYBER
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Blockchain Security &amp; Audit
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#696E7D]">
              Securing the future of blockchain one contract at a time.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {social.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-200 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-500">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-500">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-500">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <span className="text-[#696E7D]">Email</span>
                <br />
                <a
                  href="mailto:audit@odicyber.com"
                  className="text-cyan-200/90 hover:text-cyan-100"
                >
                  audit@odicyber.com
                </a>
              </li>
              <li>
                <span className="text-[#696E7D]">Telegram</span>
                <br />
                <span>@odicyber</span>
              </li>
              <li>
                <span className="text-[#696E7D]">WhatsApp</span>
                <br />
                <a
                  href="https://wa.me/15551234567"
                  className="text-cyan-200/90 hover:text-cyan-100"
                >
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-cyan-500/10 pt-8 text-center text-xs text-[#696E7D]">
          © {year} ODICYBER, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
