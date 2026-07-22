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
      canonical: `https://vdiv.com/${locale}/projects`,
      languages: {
        'en': `https://vdiv.com/en/projects`,
        'ar': `https://vdiv.com/ar/projects`,
      },
    },
    openGraph: {
      title: t('Projects.title'),
      description: t('Projects.description'),
      url: `https://vdiv.com/${locale}/projects`,
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
