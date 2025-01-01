"use client";
import HeroSection from "@/components/home/hero-section";
import { greatVibes, lora } from "./fonts/font";
import CategorySection from "@/components/home/category-section";
import FeaturedSection from "@/components/home/featured-section";
import AiCta from "@/components/home/ai-cta";
import NewsletterSection from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <main className={`${greatVibes.className} min-h-screen bg-zinc-100`}>
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Section */}
      <CategorySection />
      {/* Featured Opportunities */}
      <FeaturedSection />

      {/* AI Matching CTA Section */}
      <AiCta />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
