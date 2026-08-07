import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Cpu, Network, Layers } from "lucide-react";

export async function AboutPhilosophies() {
  const t = await getTranslations("AboutRedesign");

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-xl">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="up">
          <h2 className="font-headline-lg text-headline-lg mb-xl text-center">
            {t('phil_title')}
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          
          <Reveal direction="up" className="group glass-card p-xl rounded-xl relative overflow-hidden transition-all duration-500 hover:border-primary/40">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 m-md"></div>
            <Cpu className="text-primary w-10 h-10 mb-lg group-hover:scale-110 transition-transform" />
            <h3 className="font-headline-md text-headline-md mb-md">{t('phil_1_title')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{t('phil_1_desc')}</p>
            <div className="mt-xl font-technical-data text-technical-data text-primary/40">{t('phil_1_id')}</div>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="group glass-card p-xl rounded-xl relative overflow-hidden transition-all duration-500 hover:border-primary/40">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 m-md"></div>
            <Network className="text-primary w-10 h-10 mb-lg group-hover:scale-110 transition-transform" />
            <h3 className="font-headline-md text-headline-md mb-md">{t('phil_2_title')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{t('phil_2_desc')}</p>
            <div className="mt-xl font-technical-data text-technical-data text-primary/40">{t('phil_2_id')}</div>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="group glass-card p-xl rounded-xl relative overflow-hidden transition-all duration-500 hover:border-primary/40">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 m-md"></div>
            <Layers className="text-primary w-10 h-10 mb-lg group-hover:scale-110 transition-transform" />
            <h3 className="font-headline-md text-headline-md mb-md">{t('phil_3_title')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{t('phil_3_desc')}</p>
            <div className="mt-xl font-technical-data text-technical-data text-primary/40">{t('phil_3_id')}</div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
