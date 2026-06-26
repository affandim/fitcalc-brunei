import { Hero } from "@/components/home/hero";
import { PopularCalculators } from "@/components/home/popular-calculators";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedArticles } from "@/components/home/featured-articles";
import { LatestCalculators } from "@/components/home/latest-calculators";
import { StatsBanner } from "@/components/home/stats-banner";
import { Faq } from "@/components/home/faq";
import { Newsletter } from "@/components/home/newsletter";
import { TopBannerAd, MobileBannerAd } from "@/components/ads/ad-slots";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <TopBannerAd />
        <MobileBannerAd />
      </div>
      <PopularCalculators />
      <CategoryGrid />
      <FeaturedArticles />
      <LatestCalculators />
      <StatsBanner />
      <Faq />
      <Newsletter />
    </>
  );
}
