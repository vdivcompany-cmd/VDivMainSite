import { Reveal } from "@/components/ui/Reveal";
import { Network, Shield, Database, Cpu, Wind, Cable, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CoreCapabilitiesBackground } from "./CoreCapabilitiesBackground";

export async function CoreCapabilities() {
  const t = await getTranslations("CoreCapabilities");

  return (
    <section className="relative py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low/50 overflow-hidden">
      <CoreCapabilitiesBackground />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-xl text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">{t('title')}</h2>
          <div className="w-16 h-1 bg-primary mx-auto circuit-node relative"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg" id="capabilities-grid">
          {/* Card 1 */}
          <Reveal direction="up" className="glass-card p-xl flex flex-col gap-md relative overflow-hidden capability-card">
            <Network className="w-10 h-10 text-primary" />
            <h3 className="font-headline-md text-headline-md">{t('card1_title')}</h3>
            <p className="font-body-md text-on-surface-variant">
              {t('card1_desc')}
            </p>
            <div className="mt-auto border-t border-outline-variant/30 pt-md flex justify-between items-center">
              <span className="font-technical-data text-technical-data text-primary">001_NEXUS</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant" />
            </div>
          </Reveal>

          {/* Card 2 */}
          <Reveal direction="up" delay={0.1} className="glass-card p-xl flex flex-col gap-md relative overflow-hidden capability-card">
            <Shield className="w-10 h-10 text-tertiary" />
            <h3 className="font-headline-md text-headline-md">{t('card2_title')}</h3>
            <p className="font-body-md text-on-surface-variant">
              {t('card2_desc')}
            </p>
            <div className="mt-auto border-t border-outline-variant/30 pt-md flex justify-between items-center">
              <span className="font-technical-data text-technical-data text-tertiary">002_SECURE</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant" />
            </div>
          </Reveal>

          {/* Card 3 */}
          <Reveal direction="up" delay={0.2} className="glass-card p-xl flex flex-col gap-md relative overflow-hidden capability-card">
            <Database className="w-10 h-10 text-primary" />
            <h3 className="font-headline-md text-headline-md">{t('card3_title')}</h3>
            <p className="font-body-md text-on-surface-variant">
              {t('card3_desc')}
            </p>
            <div className="mt-auto border-t border-outline-variant/30 pt-md flex justify-between items-center">
              <span className="font-technical-data text-technical-data text-primary">003_SYNTH</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant" />
            </div>
          </Reveal>

          {/* Card 4 */}
          <Reveal direction="up" delay={0.3} className="glass-card p-xl flex flex-col gap-md relative overflow-hidden capability-card">
            <Cpu className="w-10 h-10 text-primary" />
            <h3 className="font-headline-md text-headline-md">{t('card4_title')}</h3>
            <p className="font-body-md text-on-surface-variant">
              {t('card4_desc')}
            </p>
            <div className="mt-auto border-t border-outline-variant/30 pt-md flex justify-between items-center">
              <span className="font-technical-data text-technical-data text-primary">004_CHIP</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant" />
            </div>
          </Reveal>

          {/* Card 5 */}
          <Reveal direction="up" delay={0.4} className="glass-card p-xl flex flex-col gap-md relative overflow-hidden capability-card">
            <Wind className="w-10 h-10 text-tertiary" />
            <h3 className="font-headline-md text-headline-md">{t('card5_title')}</h3>
            <p className="font-body-md text-on-surface-variant">
              {t('card5_desc')}
            </p>
            <div className="mt-auto border-t border-outline-variant/30 pt-md flex justify-between items-center">
              <span className="font-technical-data text-technical-data text-tertiary">005_THERM</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant" />
            </div>
          </Reveal>

          {/* Card 6 */}
          <Reveal direction="up" delay={0.5} className="glass-card p-xl flex flex-col gap-md relative overflow-hidden capability-card">
            <Cable className="w-10 h-10 text-primary" />
            <h3 className="font-headline-md text-headline-md">{t('card6_title')}</h3>
            <p className="font-body-md text-on-surface-variant">
              {t('card6_desc')}
            </p>
            <div className="mt-auto border-t border-outline-variant/30 pt-md flex justify-between items-center">
              <span className="font-technical-data text-technical-data text-primary">006_QUANTUM</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
