"use client";
import { greatVibes } from "../../fonts/font";
import Link from "next/link";

interface Accelerator {
  id: string;
  title: string;
  description: string;
  equity: string;
  funding: string;
  deadline: string;
  organization: string;
  eligibleCountries: string[];
  category: string;
  requirements: string[];
  image: string;
  type: "virtual" | "hybrid" | "in-person";
  stage: "pre-seed" | "seed" | "early-stage";
  duration: string;
  location: string;
  benefits: string[];
  // Additional fields for the detailed view
  programDetails: {
    overview: string;
    curriculum: {
      week: number;
      topics: string[];
      activities: string[];
    }[];
    mentors: {
      name: string;
      title: string;
      expertise: string[];
      bio: string;
      image: string;
    }[];
    alumni: {
      name: string;
      company: string;
      success: string;
      image: string;
    }[];
  };
  applicationProcess: {
    steps: string[];
    documents: string[];
    timeline: {
      date: string;
      event: string;
    }[];
  };
  contactInfo: {
    email: string;
    website: string;
    phone?: string;
    address?: string;
  };
}

interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}

export default function AcceleratorPage() {
  // In a real app, you would fetch the accelerator data using the ID
  const accelerator = mockAccelerator;

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section with Accelerator Image */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={accelerator.image}
            alt={accelerator.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/accelerators"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Accelerators
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {accelerator.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {accelerator.funding}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {accelerator.equity} Equity
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {accelerator.deadline}
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

      {/* Accelerator Details */}
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
                <p className="text-gray-600">{accelerator.description}</p>
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-3">Program Overview</h3>
                  <p className="text-gray-600">
                    {accelerator.programDetails.overview}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Program Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accelerator.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
                    >
                      <span className="text-yellow-400 text-xl">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Program Curriculum
                </h2>
                <div className="space-y-6">
                  {accelerator.programDetails.curriculum.map((week, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-yellow-400 pl-4"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        Week {week.week}
                      </h3>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Topics Covered:</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {week.topics.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Activities:</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {week.activities.map((activity, activityIndex) => (
                            <li key={activityIndex}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentors */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Meet Our Mentors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accelerator.programDetails.mentors.map((mentor, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{mentor.title}</p>
                        <p className="text-gray-600 text-sm mb-2">
                          {mentor.bio}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alumni Success */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accelerator.programDetails.alumni.map((alum, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={alum.image}
                          alt={alum.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold">{alum.name}</h3>
                          <p className="text-sm text-gray-600">
                            {alum.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600">{alum.success}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Application Process
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Steps to Apply</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      {accelerator.applicationProcess.steps.map(
                        (step, index) => (
                          <li key={index}>{step}</li>
                        )
                      )}
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      Required Documents
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {accelerator.applicationProcess.documents.map(
                        (doc, index) => (
                          <li key={index}>{doc}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Timeline</h3>
                    <div className="space-y-4">
                      {accelerator.applicationProcess.timeline.map(
                        (event, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 text-gray-600"
                          >
                            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                              {event.date}
                            </div>
                            <div>{event.event}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
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
                    <p className="font-medium">{accelerator.organization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium capitalize">
                      {accelerator.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    <p className="font-medium capitalize">{accelerator.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Stage</label>
                    <p className="font-medium capitalize">
                      {accelerator.stage}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Duration</label>
                    <p className="font-medium">{accelerator.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="font-medium">{accelerator.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Eligible Countries
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {accelerator.eligibleCountries.map((country) => (
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

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {accelerator.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">
                      {accelerator.contactInfo.email}
                    </p>
                  </div>
                  {accelerator.contactInfo.phone && (
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">
                        {accelerator.contactInfo.phone}
                      </p>
                    </div>
                  )}
                  {accelerator.contactInfo.address && (
                    <div>
                      <label className="text-sm text-gray-500">Address</label>
                      <p className="font-medium">
                        {accelerator.contactInfo.address}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={accelerator.contactInfo.website}
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
const mockAccelerator: Accelerator = {
  id: "1",
  title: "TechStart Accelerator Program",
  description:
    "A comprehensive accelerator program for early-stage tech startups focusing on AI and machine learning",
  equity: "5-10%",
  funding: "$100,000",
  deadline: "April 30, 2024",
  organization: "TechStart Ventures",
  eligibleCountries: ["US", "UK", "Canada"],
  category: "tech",
  requirements: [
    "Working prototype",
    "Full-time team",
    "Market validation",
    "Growth potential",
    "Technical expertise",
    "Business plan",
  ],
  image: "https://picsum.photos/seed/accelerator1/800/600",
  type: "hybrid",
  stage: "seed",
  duration: "6 months",
  location: "San Francisco, CA",
  benefits: [
    "Seed funding",
    "Mentorship",
    "Office space",
    "Network access",
    "Technical resources",
    "Investor connections",
  ],
  programDetails: {
    overview:
      "Our program provides startups with the resources, mentorship, and network needed to scale their business. Through a combination of workshops, one-on-one mentoring, and hands-on support, we help founders build sustainable, high-growth companies.",
    curriculum: [
      {
        week: 1,
        topics: [
          "Business Model Canvas",
          "Market Research",
          "Customer Discovery",
          "Pitch Deck Basics",
        ],
        activities: [
          "Welcome orientation",
          "Team building exercises",
          "Initial mentor meetings",
          "Workspace setup",
        ],
      },
      {
        week: 2,
        topics: [
          "Product Development",
          "User Experience Design",
          "Technical Architecture",
          "Agile Methodology",
        ],
        activities: [
          "Product roadmap planning",
          "Design sprint",
          "Technical review",
          "Team alignment",
        ],
      },
      {
        week: 3,
        topics: [
          "Go-to-Market Strategy",
          "Sales Fundamentals",
          "Marketing Basics",
          "Customer Acquisition",
        ],
        activities: [
          "Market strategy workshop",
          "Sales training",
          "Marketing planning",
          "Customer interviews",
        ],
      },
    ],
    mentors: [
      {
        name: "Dr. Sarah Chen",
        title: "AI/ML Expert",
        expertise: ["Machine Learning", "Deep Learning", "AI Strategy"],
        bio: "Former Google AI researcher with 15+ years of experience in machine learning and artificial intelligence.",
        image: "https://picsum.photos/seed/mentor1/200/200",
      },
      {
        name: "Michael Rodriguez",
        title: "Startup Advisor",
        expertise: ["Business Strategy", "Growth", "Fundraising"],
        bio: "Serial entrepreneur and angel investor who has helped scale multiple successful startups.",
        image: "https://picsum.photos/seed/mentor2/200/200",
      },
    ],
    alumni: [
      {
        name: "John Smith",
        company: "AI Solutions Inc.",
        success:
          "Raised $2M in seed funding and grew to 20 employees within 6 months of graduating.",
        image: "https://picsum.photos/seed/alumni1/100/100",
      },
      {
        name: "Emma Wilson",
        company: "Tech Innovations",
        success:
          "Acquired by a major tech company for $50M after 18 months of operation.",
        image: "https://picsum.photos/seed/alumni2/100/100",
      },
    ],
  },
  applicationProcess: {
    steps: [
      "Submit online application",
      "Initial screening",
      "Team interview",
      "Technical assessment",
      "Final pitch presentation",
      "Selection and offer",
    ],
    documents: [
      "Pitch deck",
      "Business plan",
      "Financial projections",
      "Team resumes",
      "Product demo",
      "Market research",
    ],
    timeline: [
      {
        date: "April 1, 2024",
        event: "Applications open",
      },
      {
        date: "April 15, 2024",
        event: "Early application deadline",
      },
      {
        date: "April 30, 2024",
        event: "Final application deadline",
      },
      {
        date: "May 15, 2024",
        event: "Interviews begin",
      },
      {
        date: "June 1, 2024",
        event: "Program starts",
      },
    ],
  },
  contactInfo: {
    email: "apply@techstartventures.com",
    website: "https://techstartventures.com/accelerator",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Street, San Francisco, CA 94105",
  },
};

// Mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Launch Your Startup with AcceleratorHub Pro",
  description:
    "Get unlimited access to accelerator opportunities, startup resources, and expert guidance. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "AcceleratorHub Pro",
};

const inlineAd1: AdPlacement = {
  id: "inline-1",
  title: "Startup Pitch Workshop",
  description:
    "Learn how to create a compelling pitch deck for accelerator applications.",
  image: "https://picsum.photos/seed/ad1/800/600",
  link: "https://example.com/workshop",
  sponsor: "Startup Academy",
};

const sidebarAd: AdPlacement = {
  id: "sidebar-1",
  title: "Startup Tools Bundle",
  description:
    "Special discounts on essential tools for accelerator participants.",
  image: "https://picsum.photos/seed/ad2/800/600",
  link: "https://example.com/tools",
  sponsor: "StartupTools Solutions",
};
