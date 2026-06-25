"use client";

import Link from "next/link";
import { AtSign, Camera, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-24 bg-emerald-deep text-sand">
      <div className="vital-tape opacity-30" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-xl">
              FitCalc<span className="text-mint"> Brunei</span>
            </span>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/70">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.links.facebook}
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand/20 transition-colors hover:border-mint hover:text-mint"
              >
                <Share2 size={15} />
              </a>
              <a
                href={siteConfig.links.instagram}
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand/20 transition-colors hover:border-mint hover:text-mint"
              >
                <Camera size={15} />
              </a>
              <a
                href={siteConfig.links.twitter}
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand/20 transition-colors hover:border-mint hover:text-mint"
              >
                <AtSign size={15} />
              </a>
            </div>
          </div>

          <FooterColumn
            title={t.footer.company}
            links={siteConfig.footerLinks.company.map((l) => ({
              href: l.href,
              label: t.footer[l.key as keyof typeof t.footer] as string,
            }))}
          />
          <FooterColumn
            title={t.footer.categories}
            links={siteConfig.footerLinks.categories.map((l) => ({
              href: l.href,
              label: t.nav[l.key as keyof typeof t.nav],
            }))}
          />
          <FooterColumn
            title={t.footer.resources}
            links={siteConfig.footerLinks.resources.map((l) => ({
              href: l.href,
              label: t.footer[l.key as keyof typeof t.footer] as string,
            }))}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-sand/10 pt-6 text-xs text-sand/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FitCalc Brunei. {t.footer.copyright}</p>
          <p>{t.footer.builtFor}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-wide text-mint">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-sand/70 transition-colors hover:text-sand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
