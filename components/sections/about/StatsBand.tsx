import { Reveal } from "@/components/ui/Reveal";
import { Box } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function StatsBand() {
  const t = await getTranslations("StatsBand");
  return (
    <>
      <section className="py-xl relative border-b border-outline-variant/10">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid md:grid-cols-2 gap-xl items-center">
            <Reveal direction="up">
              <span className="font-label-caps text-label-caps text-primary mb-md block">{t('mission_tag')}</span>
              <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-lg">
                {t('mission_title_start')}<span className="text-primary">{t('mission_title_highlight')}</span>{t('mission_title_end')}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
                {t('mission_desc1')}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant/80">
                {t('mission_desc2')}
              </p>
            </Reveal>
            
            <Reveal direction="up" delay={0.2} className="relative">
              <div className="aspect-video rounded-xl border border-primary/20 overflow-hidden obsidian-glass p-1">
                <div className="w-full h-full bg-surface-container-lowest rounded-lg relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-30" 
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)", backgroundSize: "20px 20px" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Box className="w-16 h-16 text-primary/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-xl border-y border-outline-variant/10">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg text-center">
            <Reveal direction="up" className="border-e border-outline-variant/20 last:border-0 md:border-e">
              <div className="font-display-lg text-display-lg text-primary mb-xs">{t('stat1_value')}</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">{t('stat1_label')}</div>
            </Reveal>
            <Reveal direction="up" delay={0.1} className="border-e border-outline-variant/20 last:border-0 md:border-e">
              <div className="font-display-lg text-display-lg text-primary mb-xs">{t('stat2_value')}</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">{t('stat2_label')}</div>
            </Reveal>
            <Reveal direction="up" delay={0.2} className="border-e border-outline-variant/20 last:border-0 md:border-e">
              <div className="font-display-lg text-display-lg text-primary mb-xs">{t('stat3_value')}</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">{t('stat3_label')}</div>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <div className="font-display-lg text-display-lg text-primary mb-xs">{t('stat4_value')}</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">{t('stat4_label')}</div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
