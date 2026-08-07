import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

export function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");

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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGzv6D115ocp1g8DMHhbstUUEWsRp6UR7jrUay6DPo0Q8wV_56w01eCfBbZjOYPVRbC1W6Cp8uqVKF_ryHpiKIXmU7PPoDR6Z27ZyG5xjXPi9b1YWhs0bFMdZtdw-aKMibBrxUc6P0UfzZf8wODIB6W9gkU_r3b3rmudQQ_tWq0x8U8ALlp3S2tqBoNoNyfZ6mQ2qKaQitP7AJSHTPVQcxZDSymL3dCZ6G-2ZGFIPcTlXZM7tygrfDiw"
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Xvml8SRymplFVlN4tkizCtVVN_hDlInKP2uHobs3dROWRXdXZoZPldvYLP5R4CxynPhaEaLsXZuDLoNKRm37QwNtArn878LrN3Dz5UUzo4LJeoRlPrUUswm0LCgl-XQNf2Q9YNKo_BqOlZg1uPudZQZsN7qatqABJ9NuvQ1EpPYndVo0PtWMH1gQnWGlYUUGZ2EqvdsvoWyBgzcdYgWgNqySoPDm3zTUeP3-fiY-4lQDbeDZboGvuw"
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
