import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Target, Terminal } from "lucide-react";

export async function AboutMission() {
  const t = await getTranslations("AboutRedesign");

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-xl border-t border-outline-variant/10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center max-w-7xl mx-auto relative z-10">
        
        <Reveal direction="up" className="max-w-[576px]">
          <h2 className="font-headline-lg text-headline-lg mb-md">
            {t('mission_title')}
          </h2>
          <div className="h-px w-24 mb-lg bg-gradient-to-r from-transparent via-outline-variant to-primary circuit-node relative"></div>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {t('mission_desc')}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-md relative">
          <Reveal direction="up" delay={0.2} className="glass-card p-lg rounded-xl flex flex-col gap-sm">
            <Target className="text-primary w-8 h-8 mb-sm" />
            <h3 className="font-headline-md text-headline-md">{t('mission_stat1_val')}</h3>
            <p className="font-technical-data text-technical-data opacity-60 uppercase">
              {t('mission_stat1_label')}
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={0.3} className="glass-card p-lg rounded-xl flex flex-col gap-sm mt-xl">
            <Terminal className="text-primary w-8 h-8 mb-sm" />
            <h3 className="font-headline-md text-headline-md">{t('mission_stat2_val')}</h3>
            <p className="font-technical-data text-technical-data opacity-60 uppercase">
              {t('mission_stat2_label')}
            </p>
          </Reveal>
        </div>
        
      </div>
    </section>
  );
}
