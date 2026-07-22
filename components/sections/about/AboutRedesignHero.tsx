"use client";

import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import LightRays from "@/components/ui/LightRays";

export function AboutRedesignHero() {
  const t = useTranslations("AboutRedesign");
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section className="relative min-h-[90vh] flex items-center px-margin-mobile md:px-margin-desktop bg-surface-dim overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#cfbcff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-xl items-center py-xl relative z-10">

        <div className="order-2 md:order-1 -mt-20 space-y-lg">
          <Reveal direction="up">
            <div className="inline-flex items-center gap-sm px-md py-xs rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-primary">{t('hero_redesign_tag')}</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h1 className="font-display-lg text-display-lg text-on-surface leading-none">
              {t('hero_redesign_title_start')} <br />
              <span className="text-primary italic">{t('hero_redesign_title_highlight')}</span> {t('hero_redesign_title_end')}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[576px]">
              {t('hero_redesign_desc')}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="pt-md space-y-sm">
            <p className="font-body-lg text-body-lg text-on-surface">
              {t('rot_text_prefix')}
            </p>
            <div className="flex items-center text-primary mt-sm" dir="ltr">
              <Marquee gradient={false} speed={50} direction={isArabic ? "right" : "left"} className="text-3xl md:text-4xl font-bold font-display py-2">
                <span className="mx-4" dir={isArabic ? "rtl" : "ltr"}>{t('rot_text1')}</span>
                <span className="mx-4 opacity-50">•</span>
                <span className="mx-4" dir={isArabic ? "rtl" : "ltr"}>{t('rot_text2')}</span>
                <span className="mx-4 opacity-50">•</span>
                <span className="mx-4" dir={isArabic ? "rtl" : "ltr"}>{t('rot_text3')}</span>
                <span className="mx-4 opacity-50">•</span>
                <span className="mx-4" dir={isArabic ? "rtl" : "ltr"}>{t('rot_text4')}</span>
                <span className="mx-4 opacity-50">•</span>
              </Marquee>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2 flex justify-center items-center relative">
          <Reveal direction="left" delay={0.2} className="w-full flex justify-center relative">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="VDiv Logo"
              className="relative z-10 w-full drop-shadow-[0_0_50px_rgba(207,188,255,0.2)] transform-gpu will-change-transform"
              src="/Logo-about.png"
            />
          </Reveal>
        </div>

      </div>

      {/* Decorative circuit lines */}
      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-primary/30 to-transparent">
        <div className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#cfbcff]"></div>
      </div>
    </section>
  );
}
