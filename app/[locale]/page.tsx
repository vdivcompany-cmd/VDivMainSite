import { SITE_URL } from '@/lib/constants';
import { CoreCapabilities } from "@/components/sections/home/CoreCapabilities";
import { WhyTrimax } from "@/components/sections/home/WhyTrimax";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Home.title'),
    description: t('Home.description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en': `${SITE_URL}/en`,
        'ar': `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      title: t('Home.title'),
      description: t('Home.description'),
      url: `${SITE_URL}/${locale}`,
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 
        The current hero section was requested to be removed.
        The About Hero was requested to be placed at the bottom.
      */}
      {/* Home Hero (Imported from About Design) */}
      <AboutHero />
      <CoreCapabilities />
      <WhyTrimax />
      <FeaturedProjects />
    </>
  );
}
