"use client";
import { useState } from "react";
import { greatVibes, lora } from "../fonts/font";
import Link from "next/link";

interface Scholarship {
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
  degreeLevel: "Undergraduate" | "Masters" | "PhD" | "All";
  field: string;
}

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState({
    country: "",
    category: "",
    degreeLevel: "",
    field: "",
  });
  const [sortBy, setSortBy] = useState("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`${greatVibes.className} text-5xl mb-6`}>
              Scholarships
            </h1>
            <p className={`${lora.className} text-xl mb-8`}>
              Discover educational funding opportunities worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12 flex-wrap">
          <h2 className={`${greatVibes.className} text-4xl`}>
            Find Your Scholarship
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

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
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
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree Level
              </label>
              <select
                value={filters.degreeLevel}
                onChange={(e) =>
                  setFilters({ ...filters, degreeLevel: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">All Levels</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study
              </label>
              <select
                value={filters.field}
                onChange={(e) =>
                  setFilters({ ...filters, field: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">All Fields</option>
                <option value="STEM">STEM</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts & Humanities</option>
                <option value="Medicine">Medicine</option>
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
                <option value="amount">Amount</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-8"
          }`}
        >
          {mockScholarships.map((scholarship, index) => (
            <Link
              key={index}
              href={`/scholarships/${scholarship.id}`}
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
                  src={scholarship.image}
                  alt={scholarship.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {scholarship.amount}
                </div>
              </div>

              <div className="p-6 flex flex-col h-full flex-grow">
                <h2 className="text-xl font-bold mb-3">{scholarship.title}</h2>
                <p className="text-gray-300 mb-4 flex-grow">
                  {scholarship.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⏰</span>
                    <span className="text-gray-300">
                      {scholarship.deadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">🎓</span>
                    <span className="text-gray-300">
                      {scholarship.degreeLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">📚</span>
                    <span className="text-gray-300">{scholarship.field}</span>
                  </div>

                  <div className="pt-4 border-t border-zinc-600">
                    <div className="flex flex-wrap gap-2">
                      {scholarship.eligibleCountries.map((country) => (
                        <span
                          key={country}
                          className="bg-zinc-600 px-3 py-1 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition duration-300"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
            Subscribe to our newsletter to receive the latest scholarship
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

// Mock data
const mockScholarships: Scholarship[] = [
  {
    id: "1",
    title: "Global Excellence Scholarship 2024",
    description:
      "Full-tuition scholarship for outstanding international students pursuing graduate studies in STEM fields.",
    amount: "$50,000",
    deadline: "March 31, 2024",
    organization: "Global Education Foundation",
    eligibleCountries: ["US", "UK", "CA", "AU"],
    category: "merit",
    requirements: [
      "3.8+ GPA",
      "Research proposal",
      "Letters of recommendation",
    ],
    image: "https://picsum.photos/seed/scholarship1/800/600",
    degreeLevel: "Masters",
    field: "STEM",
  },
  {
    id: "2",
    title: "Future Leaders MBA Scholarship",
    description:
      "Supporting ambitious professionals pursuing an MBA with demonstrated leadership potential.",
    amount: "$35,000",
    deadline: "April 15, 2024",
    organization: "Business Leaders Foundation",
    eligibleCountries: ["US", "UK", "CA"],
    category: "merit",
    requirements: ["5+ years work experience", "GMAT 700+"],
    image: "https://picsum.photos/seed/scholarship2/800/600",
    degreeLevel: "Masters",
    field: "Business",
  },
  {
    id: "3",
    title: "Arts & Humanities Grant",
    description:
      "Supporting undergraduate students pursuing degrees in arts and humanities.",
    amount: "$20,000",
    deadline: "May 1, 2024",
    organization: "Creative Arts Foundation",
    eligibleCountries: ["US", "UK"],
    category: "need-based",
    requirements: ["Portfolio submission", "Essay"],
    image: "https://picsum.photos/seed/scholarship3/800/600",
    degreeLevel: "Undergraduate",
    field: "Arts",
  },
  // Add more mock scholarships as needed
];
