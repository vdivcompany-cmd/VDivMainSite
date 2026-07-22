"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";
import { Target, ShieldCheck, Users, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function TeamValues() {
  const t = useTranslations("TeamValues");
  return (
    <section className="py-xl relative">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <Reveal direction="up" className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
          <div className="max-w-[672px]">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">{t('title')}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t('desc')}
            </p>
          </div>
          <Link href="/careers" className="font-label-caps text-label-caps text-primary border-b border-primary pb-base hover:text-on-surface transition-all">
            {t('view_careers')}
          </Link>
        </Reveal>

        {/* Values Bento Grid */}
        <div className="grid md:grid-cols-3 gap-lg mb-xl">
          <Reveal direction="up" className="md:col-span-2 group relative bg-surface-container p-xl rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all overflow-hidden">
            <div className="absolute top-0 end-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
            <Target className="w-10 h-10 text-primary mb-md" />
            <h3 className="font-headline-md text-headline-md mb-md">{t('v1_title')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              {t('v1_desc')}
            </p>
            <div className="w-full h-[1px] circuit-line"></div>
            <div className="mt-base w-1 h-1 bg-primary rounded-full"></div>
          </Reveal>

          <Reveal direction="up" delay={0.1} className="group bg-surface-container p-xl rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all">
            <ShieldCheck className="w-10 h-10 text-primary mb-md" />
            <h3 className="font-headline-md text-headline-md mb-md">{t('v2_title')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t('v2_desc')}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="group bg-surface-container p-xl rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all">
            <Users className="w-10 h-10 text-primary mb-md" />
            <h3 className="font-headline-md text-headline-md mb-md">{t('v3_title')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t('v3_desc')}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="md:col-span-2 group relative bg-surface-container p-xl rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all overflow-hidden">
            <div className="flex flex-col md:flex-row gap-lg items-center">
              <div className="flex-1">
                <Sparkles className="w-10 h-10 text-primary mb-md" />
                <h3 className="font-headline-md text-headline-md mb-md">{t('v4_title')}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t('v4_desc')}
                </p>
              </div>
              <div className="w-full md:w-64 h-32 rounded-lg border border-outline-variant/20 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover opacity-50 grayscale" 
                  alt="Future Network" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkor53hFNxATGaK4DfsGxZujzJbMvbGFEToY6OuiLh8USLdAIpI7QaXOqDQfHxkwmHACAwE1YcO_GELgXGhEKFAo7Fujlegz60bihgFIOxlWkIw8LVjeYTQMMkmIm5eTwT1nk0-5BORE5pfeAyUrEAgowAv1C0lVft2fGffhqp6xrsHYGxzB4dImTS9SAI5DNVmaxeLlzUs0gf7qaOnNRFNJZcMGO3sl-WbScKIuUVVti-K30BL9l1Hg"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Team Placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
          <Reveal direction="up" className="text-center group">
            <div className="aspect-square rounded-full border-2 border-outline-variant p-1 group-hover:border-primary transition-all mb-md mx-auto max-w-[160px]">
              <img className="w-full h-full object-cover rounded-full" alt="Elena Vance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl0MGjX91AJx9M4qRk5lGOtPZvGSusQEsnPd69ymyV_5_w_nuJdVJaN4xb3At4Ko5NHfXmrvPDw5PnDyZw3NL2BWUeYSm5qbQOM4-kKyXMGGMT7M1mAEAIDBGpEie8Dq7PVNcEe0aJspNqSRs4ADFeIk3t1Pm8XshV55VY2m1brlsqW5JIfBvYg-orLlsUJ-6DIwrdQg9JICHG6LrE24zrSKeD-B0rDgE0TeTBldQzieWv2YCgHR8K0Q" />
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Elena Vance</h4>
            <p className="font-label-caps text-label-caps text-primary">{t('t1_role')}</p>
          </Reveal>

          <Reveal direction="up" delay={0.1} className="text-center group">
            <div className="aspect-square rounded-full border-2 border-outline-variant p-1 group-hover:border-primary transition-all mb-md mx-auto max-w-[160px]">
              <img className="w-full h-full object-cover rounded-full" alt="Marcus Thorne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYy7MKQ7jPGYW_9Ou888rfyphCpPze3yw0bYNHacq1AH7xRdOT7hg8cMZf85EAMuhWVdESwXSWAxBLFrlZdktRaPh8asiOte-CfW06LMBpolc8TdO8eqeqlu5NuebbOp5vD8wt1t-WEqqcO6d3aVP984UXfhMV1adNQ3YNot9rYT-9GNRxx615t7ew0CewrJRs8TQRrx629caniyO7TaXBKCqi3NwjDojvpjZ3kitRD3wt_3zHuVeCjQ" />
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Marcus Thorne</h4>
            <p className="font-label-caps text-label-caps text-primary">{t('t2_role')}</p>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="text-center group">
            <div className="aspect-square rounded-full border-2 border-outline-variant p-1 group-hover:border-primary transition-all mb-md mx-auto max-w-[160px]">
              <img className="w-full h-full object-cover rounded-full" alt="Sana K." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnsjwq3nAs7vz-yOmNxhfnKgbGmtkmHFH6Z0z1aJivVLvdVjCfiKJcXrZoSN6OW3YI5RCIXBXj87v05Pnl6q3w9xLnnsFEODK1XQktDF5OBTqqJZ6fy5wHizyTWcOAe3YgGWsp_vQefQSaHWXrPFu0Bf-Y6IBgEyWIrqRzDab6oVZsK04xQ4DRSrcYh-NquRRpBu5nwqesLe5ZhR3QolMsMY9QUEp11JJeIlw8phupUeUZsyNKHCXCRA" />
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Sana K.</h4>
            <p className="font-label-caps text-label-caps text-primary">{t('t3_role')}</p>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="text-center group">
            <div className="aspect-square rounded-full border-2 border-outline-variant p-1 group-hover:border-primary transition-all mb-md mx-auto max-w-[160px]">
              <img className="w-full h-full object-cover rounded-full" alt="Julian Rex" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALMGtte3XNI1px4vieWSSLcLe3FVkbiipNthdRKF0W7enM6Sn-4BHXZTnP3ZvLb0hIFBXyGud2TcJRpseENkUBgBnhWp_I5V7y1lhdjXYzTPWMc-E8Vv52lBM62zXrZws1noKqH2geF11q4dCK9MS_0E3Opwr-soDJ_xWR2BnU5gcBJ7XRUGzWS2THhBWnTE1e8m27yTuzOQEMOU7QnoJb4r7iO9S9ZVIeim-EX9wuI3aVqjQOmGi9Tg" />
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface">Julian Rex</h4>
            <p className="font-label-caps text-label-caps text-primary">{t('t4_role')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
