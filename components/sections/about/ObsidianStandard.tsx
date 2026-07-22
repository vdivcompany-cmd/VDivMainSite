"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2, Shield } from "lucide-react";

export function ObsidianStandard() {
  const t = useTranslations("AboutRedesign");

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-xl mb-xl">
      <Reveal direction="up" className="max-w-7xl mx-auto glass-card rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="relative min-h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            className="w-full h-full object-cover" 
            alt="Obsidian Standard"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoG2xlp7aiWPWVBs7xMD0XrC3GpEsc8RppKC3taMvhAVbIrrRpxZG_o0QkNKS3-Y65TGSbnd-eV20g7ohq7kCjILqfD3UdFQq6dCvYUmJn022CSVMJalNdYfHPAEp2QjEx7QBhjTyiNE0Eql2T85Uz6ssB-9gC3y1pBIx20amD3Weh5T56wpGeC6xiUkeMBvQEFrNK5RGtr17A8-5bUFfdzSm1K-8ov7--ID6GnH1XETX-jKhPZv3-NA" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent md:hidden"></div>
        </div>

        <div className="p-xl flex flex-col justify-center bg-surface-container-high/40">
          <h2 className="font-headline-lg text-headline-lg mb-md">
            {t('std_title')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">
            {t('std_desc')}
          </p>
          
          <div className="space-y-md">
            <div className="flex items-center gap-md">
              <CheckCircle2 className="text-primary w-6 h-6" />
              <span className="font-technical-data text-technical-data">
                {t('std_cert1')}
              </span>
            </div>
            <div className="flex items-center gap-md">
              <Shield className="text-primary w-6 h-6" />
              <span className="font-technical-data text-technical-data">
                {t('std_cert2')}
              </span>
            </div>
          </div>
        </div>
        
      </Reveal>
    </section>
  );
}
