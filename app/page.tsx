import { AdvancedSecurityFeatures } from "@/components/landing/advanced-security-features";
import { AuditProcess } from "@/components/landing/audit-process";
import { TransparentAuditReports } from "@/components/landing/transparent-audit-reports";
import { LandingHero } from "@/components/landing/landing-hero";
import { SecurityServices } from "@/components/landing/security-services";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { TestimonialsCta } from "@/components/landing/testimonials-cta";
import { TrustedBy } from "@/components/landing/trusted-by";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010717] text-slate-100 antialiased">
      <div
        className="min-h-screen bg-[linear-gradient(180deg,#050a14_0%,#0a1220_45%,#050a14_100%)]"
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <SiteHeader />
        <LandingHero />
        <SecurityServices />
        <AuditProcess />
        <TransparentAuditReports />
        <AdvancedSecurityFeatures />
        <TrustedBy />
        <TestimonialsCta />
        <SiteFooter />
      </div>
    </div>
  );
}
