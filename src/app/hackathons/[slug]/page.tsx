"use client";
import { AdPlacement, Hackathon } from "@/lib/types";
import { greatVibes } from "../../fonts/font";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdBannerCard from "@/components/cards/ad-banner-card";
import EventScheduleCard from "@/components/cards/EventSchedule";

export default function HackathonPage() {
  // In a real app, you would fetch the hackathon data using the ID
  const hackathon = mockHackathon;
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <img
            src={hackathon.image}
            alt={hackathon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12 pt-10">
          <div className="text-white ">
            <Link
              href="/hackathons"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300 "
            >
              ← Back to Hackathons
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {hackathon.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {hackathon.prizePool}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                Deadline: {hackathon.deadline}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {hackathon.mode}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Ad Banner - Below Hero */}
      <AdBannerCard featuredAd={featuredAd} />

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  About This Hackathon
                </h2>
                <p className="text-gray-600">{hackathon.description}</p>
              </div>

              {/* Prizes */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Prizes
                </h2>
                <div className="space-y-6">
                  {hackathon.prizes.map((prize, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:felx-row items-start gap-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                        {prize.place}
                      </div>
                      <div>
                        <div className="font-bold text-lg">{prize.amount}</div>
                        <p className="text-gray-600">{prize.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Rules & Guidelines
                </h2>
                <ul className="list-inside space-y-2 text-gray-600">
                  {hackathon.rules.map((rule, index) => (
                    <li key={index}>⭐ {rule}</li>
                  ))}
                </ul>
              </div>

              {/* Inline Ad */}
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

              {/* Schedule */}
              <EventScheduleCard schedule={hackathon.schedule} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Organizer</label>
                    <p className="font-medium">{hackathon.organizer}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Mode</label>
                    <p className="font-medium">{hackathon.mode}</p>
                  </div>
                  {hackathon.location && (
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p className="font-medium">{hackathon.location}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Team Size</label>
                    <p className="font-medium">{hackathon.teamSize}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Duration</label>
                    <p className="font-medium">{hackathon.duration}</p>
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
                  <span className="text-sm text-gray-500 mb-2 block">
                    {sidebarAd.sponsor}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {sidebarAd.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{sidebarAd.description}</p>
                  <a
                    href={sidebarAd.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300 w-full text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Resources</h3>
                <div className="space-y-3">
                  {hackathon.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition-colors"
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{hackathon.contactInfo.email}</p>
                  </div>
                  {hackathon.contactInfo.discord && (
                    <div>
                      <label className="text-sm text-gray-500">Discord</label>
                      <p className="font-medium">
                        {hackathon.contactInfo.discord}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={hackathon.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 block"
                    >
                      Visit Official Website
                    </a>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <button
                className="w-full fixed bottom-0 left-0 z-20 md:relative bg-green-400 text-black px-6 py-4 rounded-md hover:bg-green-500 transition duration-300 font-bold text-lg"
                onClick={() => {
                  router.push(hackathon.registerLink);
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Mock data - replace with API call
const mockHackathon: Hackathon = {
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
};

const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Level Up Your Hackathon Game with HackPro",
  description:
    "Get access to premium hackathon resources, team matching, and mentorship. Special offer: First month free!",
  image: "https://picsum.photos/seed/featured-hack-ad/800/600",
  link: "https://example.com/hackpro-offer",
  sponsor: "HackPro",
};

const inlineAd1: AdPlacement = {
  id: "inline-1",
  title: "Cloud Credits for Hackers",
  description: "Get $5000 in cloud credits for your hackathon project!",
  image: "https://picsum.photos/seed/inline-hack-ad/800/600",
  link: "https://example.com/cloud-credits",
  sponsor: "CloudTech",
};

const sidebarAd: AdPlacement = {
  id: "sidebar-1",
  title: "Dev Tools Bundle",
  description: "Essential tools and resources for hackathon success",
  image: "https://picsum.photos/seed/sidebar-hack-ad/800/600",
  link: "https://example.com/dev-tools",
  sponsor: "DevPro",
};
