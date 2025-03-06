"use client";
import { useState } from "react";
import { greatVibes, lora } from "../fonts/font";

interface Internship {
  id: string;
  title: string;
  description: string;
  stipend: string;
  deadline: string;
  organization: string;
  eligibleCountries: string[];
  category: string;
  requirements: string[];
  image: string;
  duration: string;
  location: string;
  type: "remote" | "onsite" | "hybrid";
}

interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}

export default function InternshipsPage() {
  const [filters, setFilters] = useState({
    country: "",
    category: "",
    minStipend: "",
    maxStipend: "",
    type: "",
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
              Internships
            </h1>
            <p className={`${lora.className} text-xl mb-8`}>
              Find exciting internship opportunities to kickstart your career
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stipend Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minStipend}
                  onChange={(e) =>
                    setFilters({ ...filters, minStipend: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxStipend}
                  onChange={(e) =>
                    setFilters({ ...filters, maxStipend: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Types</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
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
                <option value="stipend">Stipend</option>
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

        {/* Internships List with Inline Ads */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-8"
          }`}
        >
          {mockInternships.map((internship, index) => (
            <>
              <div
                key={internship.id}
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
                    src={internship.image}
                    alt={internship.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {internship.stipend}
                  </div>
                </div>

                <div className="p-6 flex flex-col h-full flex-grow">
                  <h2 className="text-xl font-bold mb-3">{internship.title}</h2>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {internship.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⏰</span>
                      <span className="text-gray-300">
                        {internship.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">🏢</span>
                      <span className="text-gray-300">
                        {internship.organization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">📍</span>
                      <span className="text-gray-300">
                        {internship.location} ({internship.type})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⏱️</span>
                      <span className="text-gray-300">
                        {internship.duration}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-zinc-600">
                      <div className="flex flex-wrap gap-2">
                        {internship.eligibleCountries.map((country) => (
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

              {/* Insert ad after every 5 internships */}
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
            Subscribe to our newsletter to receive the latest internship
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
const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    description:
      "Join our team to develop cutting-edge software solutions and gain hands-on experience in a fast-paced tech environment",
    stipend: "$5,000/month",
    deadline: "April 30, 2024",
    organization: "TechCorp Inc.",
    eligibleCountries: ["US", "UK", "Canada"],
    category: "tech",
    requirements: [
      "Currently pursuing CS degree",
      "Strong programming skills",
      "Git experience",
    ],
    image: "https://picsum.photos/seed/internship1/800/600",
    duration: "3 months",
    location: "San Francisco, CA",
    type: "hybrid",
  },
  {
    id: "2",
    title: "Marketing Analytics Intern",
    description:
      "Help us analyze market trends and develop data-driven marketing strategies",
    stipend: "$4,500/month",
    deadline: "May 15, 2024",
    organization: "Digital Marketing Pro",
    eligibleCountries: ["US", "EU", "UK"],
    category: "marketing",
    requirements: [
      "Marketing or Analytics background",
      "Excel proficiency",
      "Data analysis skills",
    ],
    image: "https://picsum.photos/seed/internship2/800/600",
    duration: "6 months",
    location: "Remote",
    type: "remote",
  },
  {
    id: "3",
    title: "Investment Banking Intern",
    description:
      "Gain exposure to financial markets and investment strategies in a leading financial institution",
    stipend: "$6,000/month",
    deadline: "June 1, 2024",
    organization: "Global Finance Group",
    eligibleCountries: ["US", "Germany", "Japan"],
    category: "finance",
    requirements: [
      "Finance or Economics degree",
      "Strong analytical skills",
      "Excel proficiency",
    ],
    image: "https://picsum.photos/seed/internship3/800/600",
    duration: "3 months",
    location: "New York, NY",
    type: "onsite",
  },
];

// Add mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Launch Your Career with CareerHub Pro",
  description:
    "Get unlimited access to internship opportunities, AI-powered matching, and expert application tools. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "CareerHub Pro",
};

const inlineAds: AdPlacement[] = [
  {
    id: "inline-1",
    title: "Internship Application Workshop",
    description:
      "Join our expert-led workshop and increase your chances of securing your dream internship.",
    image: "https://picsum.photos/seed/ad1/800/600",
    link: "https://example.com/workshop",
    sponsor: "Career Academy",
  },
  {
    id: "inline-2",
    title: "Professional Development Courses",
    description: "Special discounts on courses for internship preparation.",
    image: "https://picsum.photos/seed/ad2/800/600",
    link: "https://example.com/courses",
    sponsor: "EduTech Solutions",
  },
  {
    id: "inline-3",
    title: "Resume Writing Service",
    description: "Professional resume writing support for students.",
    image: "https://picsum.photos/seed/ad3/800/600",
    link: "https://example.com/resume",
    sponsor: "ResumePro",
  },
];
