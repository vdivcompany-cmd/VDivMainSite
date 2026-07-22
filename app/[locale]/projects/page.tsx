import { ProjectsBackground } from "@/components/sections/projects/ProjectsBackground";
import { ProjectShowcase } from "@/components/sections/projects/ProjectShowcase";
import { ProjectsCTA } from "@/components/sections/projects/ProjectsCTA";
import { setRequestLocale } from 'next-intl/server';

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
