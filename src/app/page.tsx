"use client";
import { greatVibes, lora } from "./fonts/font";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`${greatVibes.className} text-5xl mb-6`}>
              Discover Your Next Opportunity
            </h1>
            <p className={`${lora.className} text-xl mb-8`}>
              Your gateway to hackathons, grants, scholarships, and career
              opportunities
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300">
                Explore Opportunities
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-md hover:bg-yellow-400 hover:text-black transition duration-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className={`${greatVibes.className} text-4xl text-center mb-12`}>
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/categories/${category.title.toLowerCase()}`}
              className="group block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-2 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-400"
            >
              <div className="text-yellow-400 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="bg-zinc-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className={`${greatVibes.className} text-4xl text-center mb-12`}>
            Featured Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-zinc-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300"
              >
                <div className="h-48 bg-gray-300">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {opportunity.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400">
                      {opportunity.deadline}
                    </span>
                    <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Matching CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="text-6xl mb-6">🤖✨</div>
              <h2 className={`${greatVibes.className} text-4xl mb-4`}>
                AI-Powered Opportunity Matching
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Coming Soon: Let our AI assistant find the perfect opportunities
                matching your skills, interests, and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-zinc-900 text-white px-6 py-3 rounded-md hover:bg-zinc-800 transition duration-300 flex items-center gap-2">
                  <span>Join Waitlist</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-gray-500">
                  {/* You could add a counter here */}
                  200+ people already waiting
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`${greatVibes.className} text-4xl mb-6`}>
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest opportunities
            directly in your inbox
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

const categories = [
  {
    icon: "🏆",
    title: "Hackathons",
    description:
      "Join exciting coding competitions and build innovative solutions",
  },
  {
    icon: "💰",
    title: "Grants",
    description: "Find funding opportunities for your projects and research",
  },
  {
    icon: "🎓",
    title: "Scholarships",
    description: "Discover educational funding opportunities worldwide",
  },
  {
    icon: "🚀",
    title: "Fellowships",
    description: "Access prestigious programs for professional growth",
  },
  {
    icon: "💼",
    title: "Internships",
    description: "Find valuable work experience opportunities at top companies",
  },
  {
    icon: "🌟",
    title: "Competitions",
    description: "Participate in contests across various fields and win prizes",
  },
  {
    icon: "🔬",
    title: "Research",
    description: "Explore research opportunities and collaborative projects",
  },
  {
    icon: "🌍",
    title: "Exchange Programs",
    description: "Discover international exchange and study abroad programs",
  },
  {
    icon: "💡",
    title: "Workshops",
    description: "Join skill-building workshops and training programs",
  },
  {
    icon: "🎯",
    title: "Mentorship",
    description: "Connect with industry experts for guidance and support",
  },
  {
    icon: "🏢",
    title: "Accelerators",
    description: "Fast-track your startup with leading accelerator programs",
  },
  {
    icon: "📚",
    title: "Conferences",
    description: "Attend prestigious conferences and networking events",
  },
];

const featuredOpportunities = [
  {
    title: "Global Tech Hackathon 2024",
    description: "48-hour virtual hackathon with $50,000 in prizes",
    image: "https://picsum.photos/seed/hackathon/800/600",
    deadline: "Deadline: Mar 30, 2024",
  },
  {
    title: "Research Grant Program",
    description: "Funding for innovative research projects in AI",
    image: "https://picsum.photos/seed/grant/800/600",
    deadline: "Deadline: Apr 15, 2024",
  },
  {
    title: "Summer Fellowship Program",
    description: "3-month fellowship at leading tech companies",
    image: "https://picsum.photos/seed/fellowship/800/600",
    deadline: "Deadline: May 1, 2024",
  },
];
