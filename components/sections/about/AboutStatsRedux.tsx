"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export function AboutStatsRedux() {
  const t = useTranslations("AboutRedesign");

  return (
    <section className="bg-surface-container py-xl border-y border-outline-variant/20">
      <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-xl">
          
          <Reveal direction="up" className="text-center">
            <div className="font-display-lg text-display-lg text-primary mb-xs">
              {t('stats_1_val')}
            </div>
            <div className="font-label-caps text-label-caps opacity-60">
              {t('stats_1_label')}
            </div>
          </Reveal>
          
          <Reveal direction="up" delay={0.1} className="text-center">
            <div className="font-display-lg text-display-lg text-primary mb-xs">
              {t('stats_2_val')}
            </div>
            <div className="font-label-caps text-label-caps opacity-60">
              {t('stats_2_label')}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="text-center">
            <div className="font-display-lg text-display-lg text-primary mb-xs">
              {t('stats_3_val')}
            </div>
            <div className="font-label-caps text-label-caps opacity-60">
              {t('stats_3_label')}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="text-center">
            <div className="font-display-lg text-display-lg text-primary mb-xs">
              {t('stats_4_val')}
            </div>
            <div className="font-label-caps text-label-caps opacity-60">
              {t('stats_4_label')}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
