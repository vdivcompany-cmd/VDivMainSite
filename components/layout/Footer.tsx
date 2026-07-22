"use client";

import { Link } from "@/i18n/routing";
import { Code2, Shield, Network } from "lucide-react";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative w-full py-xl bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/20 dark:border-primary/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col gap-md items-start">
          <Link href="/">
            <img
              alt="VDiv Logo"
              className="h-10 md:h-12 w-auto object-contain object-left"
              src="/LOGO-Nav-footer.png"
            />
          </Link>
          <p className="font-body-sm text-body-sm ">
            {t('rights')}
          </p>
          <div className="flex gap-md text-primary mt-2">
            <Network className="w-6 h-6 hover:scale-110 cursor-pointer transition-transform" />
            <Code2 className="w-6 h-6 hover:scale-110 cursor-pointer transition-transform" />
            <Shield className="w-6 h-6 hover:scale-110 cursor-pointer transition-transform" />
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('navigate')}</span>
          <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant/60 hover:text-primary transition-colors">{t('solutions')}</Link>
          <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant/60 hover:text-primary transition-colors">{t('case_studies')}</Link>
          <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant/60 hover:text-primary transition-colors">{t('tech_docs')}</Link>
        </div>

        <div className="flex flex-col gap-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('legal')}</span>
          <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant/60 hover:text-primary transition-colors">{t('privacy')}</Link>
          <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant/60 hover:text-primary transition-colors">{t('terms')}</Link>
          <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant/60 hover:text-primary transition-colors">{t('cookies')}</Link>
        </div>

        <div className="flex flex-col gap-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('locations')}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant/60">{t('loc1')}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant/60">{t('loc2')}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant/60">{t('loc3')}</span>
        </div>
      </div>
    </footer>
  );
}
