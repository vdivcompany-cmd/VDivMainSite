import { SITE_URL } from '@/lib/constants';
import { ProjectsBackground } from "@/components/sections/projects/ProjectsBackground";
import { ProjectShowcase } from "@/components/sections/projects/ProjectShowcase";
import { ProjectsCTA } from "@/components/sections/projects/ProjectsCTA";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Projects.title'),
    description: t('Projects.description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects`,
      languages: {
        'en': `${SITE_URL}/en/projects`,
        'ar': `${SITE_URL}/ar/projects`,
      },
    },
    openGraph: {
      title: t('Projects.title'),
      description: t('Projects.description'),
      url: `${SITE_URL}/${locale}/projects`,
    }
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsBackground />
      <ProjectShowcase />
      <ProjectsCTA />
    </>
  );
}
