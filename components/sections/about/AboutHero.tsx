import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";
import { AboutHeroBackground } from "./AboutHeroBackground";

export async function AboutHero() {
  const t = await getTranslations("AboutHero");

  return (
    <section className="relative min-h-[716px] flex items-center overflow-hidden border-b border-outline-variant/10">
      <AboutHeroBackground />

      <div className=" w-full mx-auto px-margin-mobile md:px-margin-desktop relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-xl lg:gap-[80px] items-center py-xl">
        <div className="flex flex-col justify-center">
          <Reveal direction="up" delay={0}>
            <div className="flex items-center gap-sm mb-lg">
              <div className="w-8 h-[1px] bg-primary"></div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{t('tag')}</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-md">
              {t('title_start')} <span className="text-primary italic font-light">{t('title_highlight')}</span> {t('title_end')}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-[576px]">
              {t('desc')}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="flex flex-wrap gap-md">
              <a
                className="px-xl py-md bg-primary text-primary-foreground font-label-caps rounded-lg hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20 inline-block text-center"
                href="#manifesto"
              >
                {t('btn_primary')}
              </a>
              <button className="px-xl py-md border border-outline text-on-surface font-label-caps rounded-lg hover:bg-surface-container transition-all active:scale-95">
                {t('btn_secondary')}
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.4} className="relative mt-12 lg:mt-0">
          <div className="aspect-[4/5] lg:aspect-square relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl group">
            <Image
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out transform-gpu"
              alt="A macro photography shot of a high-end titanium mechanical component..."
              src="/Logo-home.webp"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>

            {/* Decorative Circuit Node */}
            <div className="absolute bottom-8 start-8 flex items-center gap-sm bg-surface-container/90 px-md py-sm border border-primary/30 rounded-lg backdrop-blur-md shadow-lg shadow-black/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
              <span className="font-technical-data text-technical-data text-primary uppercase tracking-wider">{t('system_active')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
