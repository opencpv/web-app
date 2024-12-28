"use client";
import { useState } from "react";
import { greatVibes, lora } from "../fonts/font";
import CategoryPageHero from "@/components/category-listing/category-page-hero";
import ViewToggle from "@/components/category-listing/view-toggle";
import { SectionHeading } from "@/components/ui/title-text/section-heading";
import NewsletterSection from "@/components/home/newsletter-section";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  prizePool: string;
  deadline: string;
  organizer: string;
  mode: "In-Person" | "Virtual" | "Hybrid";
  location?: string;
  category: string;
  requirements: string[];
  image: string;
  teamSize: string;
  duration: string;
}

interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}

export default function HackathonsPage() {
  const [filters, setFilters] = useState({
    mode: "",
    category: "",
    teamSize: "",
  });
  const [sortBy, setSortBy] = useState("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

        <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode
              </label>
              <select
                value={filters.mode}
                onChange={(e) =>
                  setFilters({ ...filters, mode: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">All Modes</option>
                <option value="virtual">Virtual</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">All Categories</option>
                <option value="ai-ml">AI/ML</option>
                <option value="web3">Web3</option>
                <option value="mobile">Mobile</option>
                <option value="social-impact">Social Impact</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size
              </label>
              <select
                value={filters.teamSize}
                onChange={(e) =>
                  setFilters({ ...filters, teamSize: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">Any Size</option>
                <option value="solo">Solo</option>
                <option value="small">2-3 People</option>
                <option value="medium">4-5 People</option>
                <option value="large">6+ People</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="deadline">Deadline</option>
                <option value="prizePool">Prize Pool</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Ad Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 h-48 md:h-64">
                <img
                  src={featuredAd.image}
                  alt={featuredAd.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold bg-black/20 text-white px-2 py-1 rounded">
                    SPONSORED
                  </span>
                  <span className="text-sm text-white">
                    {featuredAd.sponsor}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {featuredAd.title}
                </h3>
                <p className="text-white/90 mb-6">{featuredAd.description}</p>
                <a
                  href={featuredAd.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-zinc-800 transition duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hackathons List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-8"
          }`}
        >
          {mockHackathons.map((hackathon, index) => (
            <>
              <div
                key={hackathon.id}
                className={`bg-zinc-700 text-white rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300 flex ${
                  viewMode === "list" ? "flex-row" : "flex-col"
                }`}
              >
                <div
                  className={`${
                    viewMode === "list" ? "w-72" : "h-48"
                  } bg-gray-300 relative`}
                >
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {hackathon.prizePool}
                  </div>
                </div>

                <div className="p-6 flex flex-col h-full flex-grow">
                  <h2 className="text-xl font-bold mb-3">{hackathon.title}</h2>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {hackathon.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⏰</span>
                      <span className="text-gray-300">
                        {hackathon.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">🏢</span>
                      <span className="text-gray-300">
                        {hackathon.organizer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">👥</span>
                      <span className="text-gray-300">
                        {hackathon.teamSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⌛</span>
                      <span className="text-gray-300">
                        {hackathon.duration}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-zinc-600">
                      <span className="inline-block bg-zinc-600 px-3 py-1 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition duration-300">
                        {hackathon.mode}
                      </span>
                    </div>

                    <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300 mt-4">
                      View Details
                    </button>
                  </div>
                </div>
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
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-full sm:w-1/3 h-48">
                        <img
                          src={
                            inlineAds[Math.floor(index / 5) % inlineAds.length]
                              .image
                          }
                          alt="Advertisement"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full sm:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">
                            SPONSORED
                          </span>
                          <span className="text-sm text-gray-500">
                            {
                              inlineAds[
                                Math.floor(index / 5) % inlineAds.length
                              ].sponsor
                            }
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {
                            inlineAds[Math.floor(index / 5) % inlineAds.length]
                              .title
                          }
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {
                            inlineAds[Math.floor(index / 5) % inlineAds.length]
                              .description
                          }
                        </p>
                        <a
                          href={
                            inlineAds[Math.floor(index / 5) % inlineAds.length]
                              .link
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}

// Mock data
const mockHackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI Innovation Hackathon 2024",
    description:
      "Build the next generation of AI-powered applications in this 48-hour coding challenge",
    prizePool: "$20,000",
    deadline: "April 15, 2024",
    organizer: "TechCorp",
    mode: "Virtual",
    category: "ai-ml",
    requirements: ["GitHub account", "Video submission"],
    image: "https://picsum.photos/seed/hack1/800/600",
    teamSize: "2-4 members",
    duration: "48 hours",
  },
  // Add more mock hackathons...
];

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
