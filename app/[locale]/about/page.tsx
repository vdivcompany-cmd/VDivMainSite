import { AboutRedesignHero } from "@/components/sections/about/AboutRedesignHero";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutStatsRedux } from "@/components/sections/about/AboutStatsRedux";
import { AboutPhilosophies } from "@/components/sections/about/AboutPhilosophies";
import { ObsidianStandard } from "@/components/sections/about/ObsidianStandard";
import { CtaSection } from "@/components/sections/about/CtaSection";
import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutRedesignHero />
      <AboutMission />
      <AboutStatsRedux />
      <AboutPhilosophies />
      <ObsidianStandard />
      <CtaSection />
    </>
  );
}
