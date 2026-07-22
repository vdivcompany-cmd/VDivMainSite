import { AboutRedesignHero } from "@/components/sections/about/AboutRedesignHero";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutStatsRedux } from "@/components/sections/about/AboutStatsRedux";
import { AboutPhilosophies } from "@/components/sections/about/AboutPhilosophies";
import { ObsidianStandard } from "@/components/sections/about/ObsidianStandard";
import { CtaSection } from "@/components/sections/about/CtaSection";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('About.title'),
    description: t('About.description'),
    alternates: {
      canonical: `https://vdiv.com/${locale}/about`,
      languages: {
        'en': `https://vdiv.com/en/about`,
        'ar': `https://vdiv.com/ar/about`,
      },
    },
    openGraph: {
      title: t('About.title'),
      description: t('About.description'),
      url: `https://vdiv.com/${locale}/about`,
    }
  };
}

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
