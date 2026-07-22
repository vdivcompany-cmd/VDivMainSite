import { CoreCapabilities } from "@/components/sections/home/CoreCapabilities";
import { WhyTrimax } from "@/components/sections/home/WhyTrimax";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { setRequestLocale } from 'next-intl/server';

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
