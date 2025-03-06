"use client";
import { greatVibes } from "../../fonts/font";
import Link from "next/link";

interface ExchangeProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  deadline: string;
  organization: string;
  eligibleCountries: string[];
  category: string;
  requirements: string[];
  image: string;
  type: "academic" | "professional" | "cultural";
  funding: "fully-funded" | "partially-funded" | "self-funded";
  level: "undergraduate" | "graduate" | "professional";
  location: string;
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
  benefits: string[];
  accommodation: {
    type: string;
    description: string;
  };
  visaRequirements: string[];
}

interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}

export default function ExchangeProgramPage() {
  // In a real app, you would fetch the program data using the ID
  const program = mockExchangeProgram;

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section with Program Image */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/exchange-programs"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Exchange Programs
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {program.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {program.duration}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                Deadline: {program.deadline}
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

      {/* Program Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  About This Program
                </h2>
                <p className="text-gray-600">{program.description}</p>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Program Benefits
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {program.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {program.requirements.map((req, index) => (
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
                  {program.applicationProcess.map((step, index) => (
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
                  {program.timeline.map((item, index) => (
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

              {/* Accommodation */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Accommodation
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      {program.accommodation.type}
                    </h3>
                    <p className="text-gray-600">
                      {program.accommodation.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visa Requirements */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Visa Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {program.visaRequirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
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
                    <p className="font-medium">{program.organization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium capitalize">{program.category}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    <p className="font-medium capitalize">{program.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Level</label>
                    <p className="font-medium capitalize">{program.level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Funding</label>
                    <p className="font-medium capitalize">
                      {program.funding.replace("-", " ")}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="font-medium">{program.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Eligible Countries
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {program.eligibleCountries.map((country) => (
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
                    <p className="font-medium">{program.contactInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={program.contactInfo.website}
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
const mockExchangeProgram: ExchangeProgram = {
  id: "1",
  title: "Global Business Exchange Program",
  description:
    "A comprehensive business exchange program offering hands-on experience in international markets. This program provides participants with the opportunity to work with leading companies while developing cross-cultural business skills and expanding their professional network.",
  duration: "6 months",
  deadline: "April 30, 2024",
  organization: "International Business Institute",
  eligibleCountries: ["US", "UK", "Germany", "Japan"],
  category: "business",
  requirements: [
    "Business degree or equivalent",
    "2+ years experience",
    "Language proficiency",
    "Visa eligibility",
    "Strong communication skills",
    "Cultural adaptability",
  ],
  image: "https://picsum.photos/seed/exchange1/800/600",
  type: "professional",
  funding: "partially-funded",
  level: "professional",
  location: "Multiple Locations",
  benefits: [
    "International work experience",
    "Cultural immersion",
    "Professional development",
    "Networking opportunities",
    "Language skills enhancement",
    "Career advancement",
  ],
  accommodation: {
    type: "Corporate Housing",
    description:
      "Furnished apartments in prime locations with all utilities included. Housing is arranged and subsidized by the program.",
  },
  visaRequirements: [
    "Valid passport with 6+ months validity",
    "Business visa application",
    "Employment contract",
    "Health insurance",
    "Financial documentation",
    "Background check",
  ],
  applicationProcess: [
    "Submit online application",
    "Upload required documents",
    "Complete language assessment",
    "Participate in video interview",
    "Receive acceptance letter",
    "Begin visa application process",
  ],
  contactInfo: {
    email: "exchange@businessinstitute.com",
    website: "https://businessinstitute.com/exchange",
  },
  timeline: [
    {
      date: "April 30, 2024",
      event: "Application Deadline",
    },
    {
      date: "May 7, 2024",
      event: "Interview Period",
    },
    {
      date: "May 14, 2024",
      event: "Selection Announcement",
    },
    {
      date: "May 21, 2024",
      event: "Visa Application Start",
    },
    {
      date: "June 4, 2024",
      event: "Orientation",
    },
    {
      date: "June 11, 2024",
      event: "Program Start",
    },
  ],
};

// Mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Launch Your Global Journey with ExchangeHub Pro",
  description:
    "Get unlimited access to exchange opportunities, visa assistance, and cultural preparation tools. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "ExchangeHub Pro",
};

const inlineAd1: AdPlacement = {
  id: "inline-1",
  title: "Exchange Program Preparation Workshop",
  description:
    "Join our expert-led workshop and increase your chances of securing your dream exchange program.",
  image: "https://picsum.photos/seed/ad1/800/600",
  link: "https://example.com/workshop",
  sponsor: "Exchange Academy",
};

const sidebarAd: AdPlacement = {
  id: "sidebar-1",
  title: "Language Learning Tools",
  description:
    "Special discounts on language learning resources for exchange participants.",
  image: "https://picsum.photos/seed/ad2/800/600",
  link: "https://example.com/language",
  sponsor: "LangTools Solutions",
};
