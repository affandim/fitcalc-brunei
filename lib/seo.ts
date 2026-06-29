import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/calculators/bmi-calculator". Use "/" for the homepage. */
  path: string;
  /** Optional override for the OG/Twitter image — defaults to the site-wide og-image.png. */
  ogImage?: string;
}

/**
 * Builds a complete per-page Metadata object, explicitly setting openGraph
 * and twitter fields so they reflect THIS page rather than silently
 * inheriting the root layout's homepage values. Next.js metadata objects
 * (openGraph, twitter, alternates) don't merge field-by-field with the
 * parent — a page that only sets `title`/`description` keeps the parent's
 * full openGraph block, including its title, description and url. This
 * helper avoids that trap.
 */
export function buildPageMetadata({ title, description, path, ogImage }: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
