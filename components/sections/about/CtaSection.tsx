"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("CtaSection");
  return (
    <>
      <section className="py-xl relative border-t border-outline-variant/10 overflow-hidden" id="manifesto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid md:grid-cols-12 gap-xl items-center">
            <Reveal direction="up" className="md:col-span-5">
              <span className="font-label-caps text-label-caps text-tertiary mb-md block">{t('phil_tag')}</span>
              <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-lg">
                {t('phil_title_start')}<span className="text-primary">{t('phil_title_highlight')}</span>{t('phil_title_end')}
              </h2>
              <div className="space-y-md">
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  {t('phil_desc1').split(t('phil_desc1_highlight'))[0]}
                  <span className="text-tertiary">{t('phil_desc1_highlight')}</span>
                  {t('phil_desc1').split(t('phil_desc1_highlight'))[1]}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant/80">
                  {t('phil_desc2')}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2} className="md:col-span-7">
              <div className="relative p-xl bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="grid grid-cols-1 gap-lg">
                  <div className="flex gap-md">
                    <span className="font-display-lg text-primary/20">01</span>
                    <div>
                      <h4 className="font-headline-md text-on-surface mb-xs">{t('p1_title')}</h4>
                      <p className="font-body-sm text-on-surface-variant">
                        {t('p1_desc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-md">
                    <span className="font-display-lg text-primary/20">02</span>
                    <div>
                      <h4 className="font-headline-md text-on-surface mb-xs">{t('p2_title')}</h4>
                      <p className="font-body-sm text-on-surface-variant">
                        {t('p2_desc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-md">
                    <span className="font-display-lg text-primary/20">03</span>
                    <div>
                      <h4 className="font-headline-md text-on-surface mb-xs">{t('p3_title')}</h4>
                      <p className="font-body-sm text-on-surface-variant">
                        {t('p3_desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* <section className="py-xl bg-surface-container-highest relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mask-fade"></div>
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
          <Reveal direction="up" className="max-w-[768px] mx-auto">
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-primary mb-md">{t('cta_title')}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
              {t('cta_desc')}
            </p>
            <button className="px-xl py-md bg-primary text-on-primary font-label-caps rounded-lg hover:shadow-[0_0_30px_rgba(207,188,255,0.4)] transition-all">
              {t('btn')}
            </button>
          </Reveal>
        </div>
      </section> */}
    </>
  );
}
