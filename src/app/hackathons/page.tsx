"use client";
import { useEffect, useState } from "react";
import CategoryPageHero from "@/components/category-listing/category-page-hero";
import ViewToggle from "@/components/category-listing/view-toggle";
import { SectionHeading } from "@/components/ui/title-text/section-heading";
import NewsletterSection from "@/components/home/newsletter-section";
import { AdPlacement } from "../../lib/types";
import AdBannerCard from "@/components/cards/ad-banner-card";
import HackathonCard from "@/components/cards/hackathon-card";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function HackathonsPage() {
  const [filters, setFilters] = useState({
    mode: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [sortBy, setSortBy] = useState("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .eq("is_active", true)
        .order("name");

      if (error) {
        toast.error("Failed to load categories");
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchHackathons = async () => {
      const { data, error } = await supabase.from("hackathons").select("*");
      if (error) {
        toast.error(error.message);
        setLoading(false);
      } else {
        const filteredData = filterHackathons(data);
        console.log(filteredData);
        setHackathons(filteredData);
        setLoading(false);
      }
    };
    fetchHackathons();
  }, [filters, sortBy]);

  const filterHackathons = (data: any[]) => {
    let filtered = [...data];

    // Apply filters
    if (filters.mode) {
      filtered = filtered.filter((hack) => hack.mode === filters.mode);
    }
    if (filters.categoryId) {
      filtered = filtered.filter(
        (hack) => hack.category === parseInt(filters.categoryId)
      );
    }

    // Update sorting to match actual field names
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "prizePool":
          // Remove non-numeric characters and convert to number for comparison
          const prizeA = Number(a.prize_pool.replace(/[^0-9.-]+/g, ""));
          const prizeB = Number(b.prize_pool.replace(/[^0-9.-]+/g, ""));
          return prizeB - prizeA;
        case "duration":
          // Since duration is a string like "2 months", we'll need a different approach
          // For now, we'll skip duration sorting
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  };

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <CategoryPageHero
        title="Hackathons"
        description="Showcase your skills, build amazing projects, and win prizes"
      />

      {/* Filters Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12 flex-wrap">
          <SectionHeading text="Find Hackathons" />
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-200 hover:border-yellow-400 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Mode
              </label>
              <select
                value={filters.mode}
                onChange={(e) =>
                  setFilters({ ...filters, mode: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-200"
              >
                <option value="">All Modes</option>
                <option value="VIRTUAL">Virtual</option>
                <option value="IN-PERSON">In-Person</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category
              </label>
              <select
                value={filters.categoryId}
                onChange={(e) =>
                  setFilters({ ...filters, categoryId: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all duration-200"
              >
                <option value="deadline">Deadline</option>
                <option value="prizePool">Prize Pool</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Ad Banner */}
        <AdBannerCard featuredAd={featuredAd} />

        {/* Hackathons List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-8"
          }`}
        >
          {hackathons.map((hackathon, index) => (
            <div key={index}>
              <div
                className={`bg-zinc-700 text-white rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300 flex ${
                  viewMode === "list" ? "flex-row" : "flex-col"
                }`}
              >
                <HackathonCard hackathon={hackathon} viewMode={viewMode} />
              </div>
              {/* Insert ad after every 5 hackathons */}
              {(index + 1) % 5 === 0 && (
                <div
                  className={`${
                    viewMode === "list"
                      ? "col-span-1"
                      : "md:col-span-2 lg:col-span-3"
                  }`}
                >
                  <AdBannerCard featuredAd={featuredAd} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}

// Mock data

const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Level Up Your Hackathon Game with HackPro",
  description:
    "Get access to premium hackathon resources, team matching, and mentorship. Special offer: First month free!",
  image: "https://picsum.photos/seed/featured-hack-ad/800/600",
  link: "https://example.com/hackpro-offer",
  sponsor: "HackPro",
};

const inlineAds: AdPlacement[] = [
  {
    id: "inline-1",
    title: "Hackathon Starter Kit",
    description:
      "Get everything you need to succeed in your next hackathon. Templates, tools, and resources included.",
    image: "https://picsum.photos/seed/hack-ad1/800/600",
    link: "https://example.com/starter-kit",
    sponsor: "HackTools",
  },
  {
    id: "inline-2",
    title: "Cloud Credits for Hackers",
    description: "Special cloud computing credits for hackathon participants.",
    image: "https://picsum.photos/seed/hack-ad2/800/600",
    link: "https://example.com/cloud-credits",
    sponsor: "CloudTech",
  },
  {
    id: "inline-3",
    title: "Hackathon Workshop Series",
    description: "Learn from past winners and level up your hackathon skills.",
    image: "https://picsum.photos/seed/hack-ad3/800/600",
    link: "https://example.com/workshops",
    sponsor: "HackLearn",
  },
];
