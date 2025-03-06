"use client";
import { useState } from "react";
import CategoryPageHero from "@/components/category-listing/category-page-hero";
import ViewToggle from "@/components/category-listing/view-toggle";
import { SectionHeading } from "@/components/ui/title-text/section-heading";
import NewsletterSection from "@/components/home/newsletter-section";
import { Hackathon, AdPlacement } from "../../lib/types";
import AdBannerCard from "@/components/cards/ad-banner-card";
import HackathonCard from "@/components/cards/hackathon-card";

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
        {/* <AdBannerCard featuredAd={featuredAd} /> */}

        {/* Hackathons List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-8"
          }`}
        >
          {mockHackathons.map((hackathon, index) => (
            <div key={index}>
              <HackathonCard hackathon={hackathon} viewMode={viewMode} />

              {/* Insert ad after every 5 hackathons */}
              {/* {(index + 1) % 5 === 0 && (
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
              )} */}
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
const mockHackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI Innovation Hackathon 2024",
    summary:
      "Join us for an exciting 48-hour hackathon focused on building innovative AI solutions. Work with cutting-edge technologies, learn from industry experts, and compete for amazing prizes!",
    description:
      "Join us for an exciting 48-hour hackathon focused on building innovative AI solutions. Work with cutting-edge technologies, learn from industry experts, and compete for amazing prizes!",
    prizePool: "$20,000",
    deadline: "April 15, 2024",
    organizer: "TechCorp",
    mode: "Virtual",
    category: "ai-ml",
    requirements: ["GitHub account", "Video submission"],
    image: "https://picsum.photos/seed/hack1/1920/1080",
    teamSize: "2-4 members",
    duration: "48 hours",
    schedule: [
      { date: "Apr 15, 2024", event: "Registration Deadline" },
      { date: "Apr 20, 2024", event: "Opening Ceremony" },
      { date: "Apr 20-22, 2024", event: "Hacking Period" },
      { date: "Apr 22, 2024", event: "Project Submissions" },
      { date: "Apr 23, 2024", event: "Judging & Awards" },
    ],
    prizes: [
      {
        place: "1st Place",
        amount: "$10,000",
        description: "Plus cloud credits and mentorship opportunities",
      },
      {
        place: "2nd Place",
        amount: "$6,000",
        description: "Plus premium subscriptions to dev tools",
      },
      {
        place: "3rd Place",
        amount: "$4,000",
        description: "Plus swag packages",
      },
    ],
    rules: [
      "All code must be written during the hackathon",
      "Teams must consist of 2-4 members",
      "Use of open-source libraries is allowed",
      "Projects must be original work",
      "Submissions must include source code and demo video",
      "Teams must present their projects to judges",
    ],
    resources: [
      {
        title: "Starter Templates & Documentation",
        link: "https://example.com/resources",
      },
      {
        title: "Dataset Access",
        link: "https://example.com/datasets",
      },
      {
        title: "API Documentation",
        link: "https://example.com/api-docs",
      },
    ],
    contactInfo: {
      email: "hackathon@techcorp.com",
      discord: "discord.gg/techcorp-hack",
      website: "https://example.com/hackathon",
    },
    registerLink: "https://example.com/register",
  },
  // Add more mock hackathons...
];

// const featuredAd: AdPlacement = {
//   id: "featured-1",
//   title: "Level Up Your Hackathon Game with HackPro",
//   description:
//     "Get access to premium hackathon resources, team matching, and mentorship. Special offer: First month free!",
//   image: "https://picsum.photos/seed/featured-hack-ad/800/600",
//   link: "https://example.com/hackpro-offer",
//   sponsor: "HackPro",
// };

// const inlineAds: AdPlacement[] = [
//   {
//     id: "inline-1",
//     title: "Hackathon Starter Kit",
//     description:
//       "Get everything you need to succeed in your next hackathon. Templates, tools, and resources included.",
//     image: "https://picsum.photos/seed/hack-ad1/800/600",
//     link: "https://example.com/starter-kit",
//     sponsor: "HackTools",
//   },
//   {
//     id: "inline-2",
//     title: "Cloud Credits for Hackers",
//     description: "Special cloud computing credits for hackathon participants.",
//     image: "https://picsum.photos/seed/hack-ad2/800/600",
//     link: "https://example.com/cloud-credits",
//     sponsor: "CloudTech",
//   },
//   {
//     id: "inline-3",
//     title: "Hackathon Workshop Series",
//     description: "Learn from past winners and level up your hackathon skills.",
//     image: "https://picsum.photos/seed/hack-ad3/800/600",
//     link: "https://example.com/workshops",
//     sponsor: "HackLearn",
//   },
// ];
