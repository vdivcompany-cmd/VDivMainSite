import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export async function WhyTrimax() {
  const t = await getTranslations("WhyTrimax");
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
        <div className="lg:col-span-7 relative">
          <Reveal direction="left">
            <div className="aspect-video bg-surface-container rounded-xl overflow-hidden border border-outline-variant/30 group relative">
              <Image 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                alt="Laboratory clean room" 
                src="/images/why-trimax.webp"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
            </div>
          </Reveal>
          {/* Circuit Node Decoration */}
          <div className="absolute -bottom-4 -end-4 w-24 h-24 border-b-2 border-e-2 border-primary/40 hidden md:block"></div>
        </div>
        
        <div className="lg:col-span-5">
          <Reveal direction="right">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-lg">
              {t('title_start')} <span className="text-tertiary">{t('title_highlight')}</span>{t('title_end')}
            </h2>
            <div className="space-y-lg">
              <div className="flex gap-md">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-primary flex items-center justify-center font-technical-data text-primary">01</div>
                <div>
                  <h4 className="font-headline-md text-body-lg font-bold mb-xs">{t('f1_title')}</h4>
                  <p className="font-body-sm text-on-surface-variant">{t('f1_desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-md">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-tertiary flex items-center justify-center font-technical-data text-tertiary">02</div>
                <div>
                  <h4 className="font-headline-md text-body-lg font-bold mb-xs">{t('f2_title')}</h4>
                  <p className="font-body-sm text-on-surface-variant">{t('f2_desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-md">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-primary flex items-center justify-center font-technical-data text-primary">03</div>
                <div>
                  <h4 className="font-headline-md text-body-lg font-bold mb-xs">{t('f3_title')}</h4>
                  <p className="font-body-sm text-on-surface-variant">{t('f3_desc')}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
