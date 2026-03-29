import { AdvancedSecurityCoverage } from "@/components/landing/advanced-security-coverage";
import { AdvancedSecurityFeatures } from "@/components/landing/advanced-security-features";
import { AuditProcess } from "@/components/landing/audit-process";
import { TransparentAuditReports } from "@/components/landing/transparent-audit-reports";
import { LandingHero } from "@/components/landing/landing-hero";
import { MeetOurTeam } from "@/components/landing/meet-our-team";
import { PricingPlans } from "@/components/landing/pricing-plans";
import { LatestAuditReports } from "@/components/landing/latest-audit-reports";
import { SupportedNetworks } from "@/components/landing/supported-networks";
import { SecurityServices } from "@/components/landing/security-services";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { TestimonialsCta } from "@/components/landing/testimonials-cta";
import { TrustedBy } from "@/components/landing/trusted-by";
import { TrustedPartnersIntegrations } from "@/components/landing/trusted-partners-integrations";
import { WhyChooseUs } from "@/components/landing/why-choose-us";

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
        <SupportedNetworks />
        <LatestAuditReports />
        <WhyChooseUs />
        <TrustedPartnersIntegrations />
        <MeetOurTeam />
        <AdvancedSecurityCoverage />
        <AdvancedSecurityFeatures />
        <PricingPlans />
        <TrustedBy />
        <TestimonialsCta />
        <SiteFooter />
      </div>
    </div>
  );
}
