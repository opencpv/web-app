"use client";
import { greatVibes } from "../../fonts/font";
import Link from "next/link";

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
  // Additional fields for the detailed view
  applicationProcess: string[];
  contactInfo: {
    email: string;
    website: string;
  };
  timeline: {
    date: string;
    event: string;
  }[];
}

interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}

export default function FellowshipPage() {
  // In a real app, you would fetch the fellowship data using the ID
  const fellowship = mockFellowship;

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section with Fellowship Image */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={fellowship.image}
            alt={fellowship.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/fellowships"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Fellowships
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {fellowship.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {fellowship.amount}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                Deadline: {fellowship.deadline}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ad Banner - Below Hero */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 h-48">
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
                <span className="text-sm text-white">{featuredAd.sponsor}</span>
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

      {/* Fellowship Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  About This Fellowship
                </h2>
                <p className="text-gray-600">{fellowship.description}</p>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {fellowship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Inline Ad - Between Requirements and Application Process */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="w-full sm:w-1/3 h-48">
                    <img
                      src={inlineAd1.image}
                      alt={inlineAd1.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        SPONSORED
                      </span>
                      <span className="text-sm text-gray-500">
                        {inlineAd1.sponsor}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {inlineAd1.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {inlineAd1.description}
                    </p>
                    <a
                      href={inlineAd1.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  How to Apply
                </h2>
                <ol className="list-decimal list-inside space-y-4 text-gray-600">
                  {fellowship.applicationProcess.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Important Dates
                </h2>
                <div className="space-y-4">
                  {fellowship.timeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 text-gray-600"
                    >
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                        {item.date}
                      </div>
                      <div>{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Organization
                    </label>
                    <p className="font-medium">{fellowship.organization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium capitalize">
                      {fellowship.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Eligible Countries
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fellowship.eligibleCountries.map((country) => (
                        <span
                          key={country}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">
                      {fellowship.contactInfo.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={fellowship.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-yellow-600 hover:text-yellow-700"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar Ad */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={sidebarAd.image}
                    alt={sidebarAd.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 text-xs font-semibold bg-black/20 text-white px-2 py-1 rounded">
                    SPONSORED
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">
                      {sidebarAd.sponsor}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {sidebarAd.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{sidebarAd.description}</p>
                  <a
                    href={sidebarAd.link}
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
        </div>
      </section>
    </main>
  );
}

// Mock data - replace with actual API call
const mockFellowship: Fellowship = {
  id: "1",
  title: "Research Fellowship in AI and Machine Learning",
  description:
    "A prestigious fellowship opportunity for researchers in artificial intelligence and machine learning. This fellowship provides financial support and resources for cutting-edge research in AI and ML, with a focus on practical applications and societal impact.",
  amount: "$75,000/year",
  deadline: "April 30, 2024",
  organization: "Tech Research Institute",
  eligibleCountries: ["US", "UK", "Canada"],
  category: "research",
  requirements: [
    "PhD in Computer Science or related field",
    "Research proposal",
    "University affiliation",
    "Minimum 2 years of research experience",
    "Strong publication record",
    "Letters of recommendation",
  ],
  image: "https://picsum.photos/seed/fellowship1/800/600",
  applicationProcess: [
    "Complete the online application form",
    "Submit your research proposal (max 5 pages)",
    "Upload your CV and publication list",
    "Provide three letters of recommendation",
    "Submit your university affiliation letter",
  ],
  contactInfo: {
    email: "fellowships@techresearch.org",
    website: "https://techresearch.org/fellowships",
  },
  timeline: [
    {
      date: "April 30, 2024",
      event: "Application Deadline",
    },
    {
      date: "May 15, 2024",
      event: "Shortlist Announcement",
    },
    {
      date: "June 1, 2024",
      event: "Interviews",
    },
    {
      date: "June 15, 2024",
      event: "Final Selection",
    },
    {
      date: "July 1, 2024",
      event: "Fellowship Start Date",
    },
  ],
};

// Mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Launch Your Research Career with ResearchHub Pro",
  description:
    "Get unlimited access to fellowship opportunities, AI-powered matching, and expert application tools. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "ResearchHub Pro",
};

const inlineAd1: AdPlacement = {
  id: "inline-1",
  title: "Fellowship Application Workshop",
  description:
    "Join our expert-led workshop and increase your chances of securing a prestigious fellowship.",
  image: "https://picsum.photos/seed/ad1/800/600",
  link: "https://example.com/workshop",
  sponsor: "Fellowship Academy",
};

const sidebarAd: AdPlacement = {
  id: "sidebar-1",
  title: "Research Equipment Deals",
  description: "Special discounts on lab equipment for fellowship recipients.",
  image: "https://picsum.photos/seed/ad2/800/600",
  link: "https://example.com/equipment",
  sponsor: "LabTech Solutions",
};
