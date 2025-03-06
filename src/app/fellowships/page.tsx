"use client";
import { useState } from "react";
import { greatVibes, lora } from "../fonts/font";

interface Fellowship {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  organization: string;
  eligibleCountries: string[];
  category: string;
  requirements: string[];
  image: string;
}

interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}

export default function FellowshipsPage() {
  const [filters, setFilters] = useState({
    country: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });
  const [sortBy, setSortBy] = useState("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section - matching home page style */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`${greatVibes.className} text-5xl mb-6`}>
              Fellowships
            </h1>
            <p className={`${lora.className} text-xl mb-8`}>
              Discover prestigious fellowship opportunities to advance your
              career and research
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section - styled like Categories section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12 flex-wrap">
          <h2 className={`${greatVibes.className} text-4xl`}>
            Filter Opportunities
          </h2>

          {/* View Toggle */}
          <div className="bg-white rounded-lg shadow-md p-1 border-2 border-transparent">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Grid
              </span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                List
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Eligibility
              </label>
              <select
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">All Countries</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
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
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Categories</option>
                <option value="research">Research</option>
                <option value="leadership">Leadership</option>
                <option value="innovation">Innovation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, minAmount: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, maxAmount: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="deadline">Deadline</option>
                <option value="amount">Amount</option>
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

        {/* Fellowships List with Inline Ads */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-8"
          }`}
        >
          {mockFellowships.map((fellowship, index) => (
            <>
              <div
                key={fellowship.id}
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
                    src={fellowship.image}
                    alt={fellowship.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {fellowship.amount}
                  </div>
                </div>

                <div className="p-6 flex flex-col h-full flex-grow">
                  <h2 className="text-xl font-bold mb-3">{fellowship.title}</h2>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {fellowship.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⏰</span>
                      <span className="text-gray-300">
                        {fellowship.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">🏢</span>
                      <span className="text-gray-300">
                        {fellowship.organization}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-zinc-600">
                      <div className="flex flex-wrap gap-2">
                        {fellowship.eligibleCountries.map((country) => (
                          <span
                            key={country}
                            className="bg-zinc-600 px-3 py-1 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition duration-300"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300 mt-4">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Insert ad after every 5 fellowships */}
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
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`${greatVibes.className} text-4xl mb-6`}>
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest fellowship
            opportunities directly in your inbox
          </p>
          <div className="flex gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-md border border-gray-300 w-full max-w-md"
            />
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// Mock data - replace with actual API call
const mockFellowships: Fellowship[] = [
  {
    id: "1",
    title: "Research Fellowship in AI and Machine Learning",
    description:
      "A prestigious fellowship opportunity for researchers in artificial intelligence and machine learning",
    amount: "$75,000/year",
    deadline: "April 30, 2024",
    organization: "Tech Research Institute",
    eligibleCountries: ["US", "UK", "Canada"],
    category: "research",
    requirements: [
      "PhD in Computer Science or related field",
      "Research proposal",
      "University affiliation",
    ],
    image: "https://picsum.photos/seed/fellowship1/800/600",
  },
  {
    id: "2",
    title: "Leadership Development Fellowship",
    description:
      "A comprehensive leadership development program for emerging leaders in technology",
    amount: "$60,000/year",
    deadline: "May 15, 2024",
    organization: "Global Leadership Foundation",
    eligibleCountries: ["US", "EU", "UK"],
    category: "leadership",
    requirements: [
      "5+ years experience",
      "Leadership potential",
      "Recommendation letters",
    ],
    image: "https://picsum.photos/seed/fellowship2/800/600",
  },
  {
    id: "3",
    title: "Innovation Fellowship in Healthcare",
    description:
      "Supporting healthcare innovators to develop breakthrough solutions",
    amount: "$80,000/year",
    deadline: "June 1, 2024",
    organization: "Health Innovation Institute",
    eligibleCountries: ["US", "Germany", "Japan"],
    category: "innovation",
    requirements: [
      "Healthcare background",
      "Innovation proposal",
      "Team experience",
    ],
    image: "https://picsum.photos/seed/fellowship3/800/600",
  },
];

// Add mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Launch Your Research Career with ResearchHub Pro",
  description:
    "Get unlimited access to fellowship opportunities, AI-powered matching, and expert application tools. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "ResearchHub Pro",
};

const inlineAds: AdPlacement[] = [
  {
    id: "inline-1",
    title: "Fellowship Application Workshop",
    description:
      "Join our expert-led workshop and increase your chances of securing a prestigious fellowship.",
    image: "https://picsum.photos/seed/ad1/800/600",
    link: "https://example.com/workshop",
    sponsor: "Fellowship Academy",
  },
  {
    id: "inline-2",
    title: "Research Equipment Deals",
    description:
      "Special discounts on lab equipment for fellowship recipients.",
    image: "https://picsum.photos/seed/ad2/800/600",
    link: "https://example.com/equipment",
    sponsor: "LabTech Solutions",
  },
  {
    id: "inline-3",
    title: "Academic Publishing Service",
    description: "Professional editing and publishing support for researchers.",
    image: "https://picsum.photos/seed/ad3/800/600",
    link: "https://example.com/publishing",
    sponsor: "ResearchPublish Pro",
  },
];
