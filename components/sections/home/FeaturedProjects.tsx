import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export async function FeaturedProjects() {
  const t = await getTranslations("FeaturedProjects");

  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-highest/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('title')}</h2>
            <p className="font-body-md text-on-surface-variant">{t('desc')}</p>
          </div>
          <button className="font-technical-data text-label-caps text-primary border-b border-primary hover:pb-1 transition-all">
            {t('view_all')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          {/* Project 1 */}
          <Reveal direction="up" className="group relative overflow-hidden rounded-xl border border-outline-variant/20">
            <div className="aspect-[16/9] overflow-hidden relative">
              <Image 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Offshore Node" 
                src="/images/project-featured-1.webp"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent p-xl flex flex-col justify-end">
              <span className="font-label-caps text-label-caps text-tertiary mb-xs">{t('p1_tag')}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">{t('p1_title')}</h3>
              <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                <p className="font-body-sm text-on-surface-variant pt-2">
                  {t('p1_desc')}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Project 2 */}
          <Reveal direction="up" delay={0.2} className="group relative overflow-hidden rounded-xl border border-outline-variant/20">
            <div className="aspect-[16/9] overflow-hidden relative">
              <Image 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Aerospace" 
                src="/images/project-featured-2.webp"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent p-xl flex flex-col justify-end">
              <span className="font-label-caps text-label-caps text-primary mb-xs">{t('p2_tag')}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">{t('p2_title')}</h3>
              <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                <p className="font-body-sm text-on-surface-variant pt-2">
                  {t('p2_desc')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
