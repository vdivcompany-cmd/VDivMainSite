"use client";

import { useTranslations } from "next-intl";
import { Satellite, MapPin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactNode3D } from "./ContactNode3D";

export function ContactSidebar() {
  const t = useTranslations("ContactUs");

  return (
    <aside className="lg:col-span-5 space-y-gutter">
      <Reveal direction="up" delay={0.2}>
        {/* 3D Interactive Location Node */}
        <div className="bg-surface-dim/40 backdrop-blur-xl rounded-xl overflow-hidden h-[360px] relative border border-primary/20 group">
          <div className="absolute inset-0 z-0">
            <ContactNode3D />
          </div>

          <div className="absolute inset-0 pointer-events-none p-lg flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className="bg-surface/60 backdrop-blur-md px-sm py-xs rounded border border-primary/20">
                <span className="font-technical-data text-technical-data text-primary">NODE_STATUS: ONLINE</span>
              </div>
              <Satellite className="text-primary animate-pulse w-5 h-5" />
            </div>

            <div className="bg-surface-dim/80 backdrop-blur-md p-md rounded border border-primary/10 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
              <h3 className="font-label-caps text-label-caps text-on-surface mb-xs uppercase">
                {t('sidebar_title')}
              </h3>
              <p className="font-body-sm text-primary mb-0">
                {t('sidebar_location')}
              </p>
              <div className="w-full h-px bg-primary/20 my-sm"></div>
              <div className="flex justify-between font-technical-data text-[11px] text-on-surface-variant">
                <span>{t('sidebar_active')}</span>
                <span className="text-tertiary">{t('sidebar_encryption')}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.4}>
        {/* Location Data */}
        <div className="bg-surface-dim/40 backdrop-blur-xl p-lg rounded-xl border border-primary/10 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-md"></div>

          <div className="flex items-start gap-md mb-md">
            <MapPin className="text-primary w-6 h-6 shrink-0 mt-1" />
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-xs">
                {t('sidebar_hq')}
              </h3>
              <p className="font-technical-data text-technical-data text-on-surface-variant leading-relaxed">
                52.5200° N, 13.4050° E<br />
                <span className="text-error mt-xs inline-block">
                  {t('sidebar_address')}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-primary/30 to-transparent my-md"></div>

          <div className="flex items-center gap-md">
            <Mail className="text-tertiary w-6 h-6 shrink-0" />
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              vdivcompany@gmail.com<br /> 
              <span dir="ltr" className="inline-block mt-xs">+20 1063505368</span>
            </p>
          </div>
        </div>
      </Reveal>
    </aside>
  );
}
