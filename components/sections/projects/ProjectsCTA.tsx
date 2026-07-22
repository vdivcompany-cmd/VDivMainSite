"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Rocket } from "lucide-react";

export function ProjectsCTA() {
  const t = useTranslations("ProjectsShowcase");

  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto relative z-10">
      <Reveal direction="up">
        <div className="relative bg-surface-container-highest/30 backdrop-blur-md border border-tertiary/20 p-xl rounded-xl flex flex-col md:flex-row items-center justify-between gap-lg overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg mb-sm">
              {t('cta_title_start')}
              <span className="text-tertiary">{t('cta_title_highlight')}</span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[512px]">
              {t('cta_desc')}
            </p>
          </div>
          
          <button className="relative z-10 px-xl py-md bg-tertiary text-on-tertiary font-label-caps text-label-caps rounded-sm flex items-center gap-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(231,195,101,0.4)]">
            {t('cta_btn')} <Rocket className="w-5 h-5" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
