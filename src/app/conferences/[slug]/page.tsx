"use client";
import { greatVibes } from "../../fonts/font";
import Link from "next/link";

interface Conference {
  id: string;
  title: string;
  description: string;
  date: string;
  price: string;
  organization: string;
  eligibleCountries: string[];
  category: string;
  requirements: string[];
  image: string;
  type: "virtual" | "in-person" | "hybrid";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  location: string;
  speakers: {
    name: string;
    title: string;
    organization: string;
    image: string;
    bio: string;
    topics: string[];
  }[];
  topics: string[];
  // Additional fields for the detailed view
  schedule: {
    date: string;
    time: string;
    title: string;
    description: string;
    speaker?: string;
    type: "keynote" | "panel" | "workshop" | "networking";
  }[];
  registration: {
    earlyBird: {
      price: string;
      deadline: string;
    };
    regular: {
      price: string;
      deadline: string;
    };
    includes: string[];
  };
  venue: {
    name: string;
    address: string;
    city: string;
    country: string;
    mapLink: string;
    facilities: string[];
  };
  contactInfo: {
    email: string;
    website: string;
    phone?: string;
    socialMedia?: {
      platform: string;
      url: string;
    }[];
  };
  testimonials: {
    name: string;
    title: string;
    organization: string;
    image: string;
    quote: string;
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

export default function ConferencePage() {
  // In a real app, you would fetch the conference data using the ID
  const conference = mockConference;

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section with Conference Image */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={conference.image}
            alt={conference.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/conferences"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Conferences
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {conference.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {conference.price}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {conference.date}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {conference.duration}
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

      {/* Conference Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  About This Conference
                </h2>
                <p className="text-gray-600">{conference.description}</p>
              </div>

              {/* Topics */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Conference Topics
                </h2>
                <div className="flex flex-wrap gap-3">
                  {conference.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Conference Schedule
                </h2>
                <div className="space-y-6">
                  {conference.schedule.map((session, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-yellow-400 pl-4"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                          {session.date}
                        </span>
                        <span className="text-gray-600">{session.time}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            session.type === "keynote"
                              ? "bg-purple-100 text-purple-800"
                              : session.type === "panel"
                              ? "bg-blue-100 text-blue-800"
                              : session.type === "workshop"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {session.type.charAt(0).toUpperCase() +
                            session.type.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {session.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {session.description}
                      </p>
                      {session.speaker && (
                        <p className="text-gray-500">
                          Speaker: {session.speaker}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Featured Speakers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conference.speakers.map((speaker, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {speaker.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{speaker.title}</p>
                        <p className="text-gray-600 text-sm mb-2">
                          {speaker.organization}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {speaker.bio}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {speaker.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Registration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Early Bird</h3>
                    <p className="text-3xl font-bold text-yellow-600 mb-2">
                      {conference.registration.earlyBird.price}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Until {conference.registration.earlyBird.deadline}
                    </p>
                    <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300">
                      Register Now
                    </button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Regular</h3>
                    <p className="text-3xl font-bold text-yellow-600 mb-2">
                      {conference.registration.regular.price}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Until {conference.registration.regular.deadline}
                    </p>
                    <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300">
                      Register Now
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">
                    Registration Includes
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conference.registration.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <span className="text-yellow-400">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Venue */}
              {conference.type !== "virtual" && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                    Venue Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {conference.venue.name}
                      </h3>
                      <p className="text-gray-600">
                        {conference.venue.address}
                      </p>
                      <p className="text-gray-600">
                        {conference.venue.city}, {conference.venue.country}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Facilities</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {conference.venue.facilities.map((facility, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <span className="text-yellow-400">✓</span>
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={conference.venue.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              )}

              {/* Testimonials */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  What Past Attendees Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conference.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {testimonial.organization}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600">{testimonial.quote}</p>
                    </div>
                  ))}
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
                    <p className="font-medium">{conference.organization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium capitalize">
                      {conference.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    <p className="font-medium capitalize">{conference.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Level</label>
                    <p className="font-medium capitalize">{conference.level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Duration</label>
                    <p className="font-medium">{conference.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="font-medium">{conference.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Eligible Countries
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {conference.eligibleCountries.map((country) => (
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
                  {conference.requirements.map((req, index) => (
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
                      {conference.contactInfo.email}
                    </p>
                  </div>
                  {conference.contactInfo.phone && (
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">
                        {conference.contactInfo.phone}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={conference.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-yellow-600 hover:text-yellow-700"
                    >
                      Visit Website
                    </a>
                  </div>
                  {conference.contactInfo.socialMedia && (
                    <div>
                      <label className="text-sm text-gray-500">
                        Social Media
                      </label>
                      <div className="flex gap-2 mt-2">
                        {conference.contactInfo.socialMedia.map(
                          (social, index) => (
                            <a
                              key={index}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-yellow-600"
                            >
                              {social.platform}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
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
const mockConference: Conference = {
  id: "1",
  title: "Global Tech Conference 2024",
  description:
    "The world's largest technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders, innovators, and technology enthusiasts for three days of learning, networking, and inspiration.",
  date: "June 15-17, 2024",
  price: "$499",
  organization: "TechWorld International",
  eligibleCountries: ["US", "UK", "Canada", "EU"],
  category: "tech",
  requirements: [
    "Professional background",
    "Registration fee",
    "Valid ID",
    "COVID-19 vaccination (if in-person)",
    "Laptop/device for workshops",
    "Business cards for networking",
  ],
  image: "https://picsum.photos/seed/conference1/800/600",
  type: "hybrid",
  level: "intermediate",
  duration: "3 days",
  location: "San Francisco, CA & Virtual",
  speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "AI Research Director",
      organization: "Google AI",
      image: "https://picsum.photos/seed/speaker1/200/200",
      bio: "Former Google AI researcher with 15+ years of experience in machine learning and artificial intelligence. Leading breakthrough research in natural language processing and computer vision.",
      topics: ["AI", "Machine Learning", "Deep Learning", "Research"],
    },
    {
      name: "Michael Rodriguez",
      title: "CTO",
      organization: "Tech Innovations Inc.",
      image: "https://picsum.photos/seed/speaker2/200/200",
      bio: "Serial entrepreneur and technology leader with expertise in scaling tech companies. Passionate about innovation and digital transformation.",
      topics: [
        "Innovation",
        "Digital Transformation",
        "Leadership",
        "Technology",
      ],
    },
  ],
  topics: [
    "Artificial Intelligence",
    "Blockchain Technology",
    "Cloud Computing",
    "Cybersecurity",
    "Digital Transformation",
    "Future of Work",
    "Innovation",
    "Technology Trends",
  ],
  schedule: [
    {
      date: "June 15, 2024",
      time: "9:00 AM - 10:30 AM",
      title: "Opening Ceremony",
      description: "Welcome address and keynote speeches",
      speaker: "Dr. Sarah Chen",
      type: "keynote",
    },
    {
      date: "June 15, 2024",
      time: "11:00 AM - 12:30 PM",
      title: "AI Panel Discussion",
      description: "The future of artificial intelligence in business",
      speaker: "Michael Rodriguez",
      type: "panel",
    },
    {
      date: "June 15, 2024",
      time: "2:00 PM - 4:00 PM",
      title: "Hands-on AI Workshop",
      description: "Building your first AI model",
      type: "workshop",
    },
    {
      date: "June 15, 2024",
      time: "4:30 PM - 6:00 PM",
      title: "Networking Reception",
      description: "Connect with industry leaders and peers",
      type: "networking",
    },
  ],
  registration: {
    earlyBird: {
      price: "$399",
      deadline: "April 30, 2024",
    },
    regular: {
      price: "$499",
      deadline: "June 1, 2024",
    },
    includes: [
      "Full conference access",
      "Lunch and refreshments",
      "Conference materials",
      "Networking events",
      "Certificate of attendance",
      "Access to recorded sessions",
    ],
  },
  venue: {
    name: "San Francisco Convention Center",
    address: "123 Market Street",
    city: "San Francisco",
    country: "United States",
    mapLink: "https://maps.google.com",
    facilities: [
      "Free Wi-Fi",
      "Parking",
      "Restaurant",
      "Business center",
      "Accessibility features",
      "Medical room",
    ],
  },
  contactInfo: {
    email: "info@globaltechconference.com",
    website: "https://globaltechconference.com",
    phone: "+1 (555) 123-4567",
    socialMedia: [
      {
        platform: "Twitter",
        url: "https://twitter.com/globaltechconf",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/globaltechconference",
      },
    ],
  },
  testimonials: [
    {
      name: "John Smith",
      title: "Software Engineer",
      organization: "Tech Solutions Inc.",
      image: "https://picsum.photos/seed/testimonial1/100/100",
      quote:
        "An incredible conference that provided valuable insights and networking opportunities. The workshops were particularly helpful for my professional development.",
    },
    {
      name: "Emma Wilson",
      title: "Product Manager",
      organization: "Innovation Labs",
      image: "https://picsum.photos/seed/testimonial2/100/100",
      quote:
        "The quality of speakers and the organization of the event was outstanding. I learned so much and made valuable connections.",
    },
  ],
};

// Mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "ConferenceHub Pro - Your Gateway to Global Conferences",
  description:
    "Get unlimited access to conference opportunities, networking events, and professional development resources. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "ConferenceHub Pro",
};

const inlineAd1: AdPlacement = {
  id: "inline-1",
  title: "Conference Planning Workshop",
  description:
    "Learn how to plan and organize successful conferences and events.",
  image: "https://picsum.photos/seed/ad1/800/600",
  link: "https://example.com/workshop",
  sponsor: "EventPro Academy",
};

const sidebarAd: AdPlacement = {
  id: "sidebar-1",
  title: "Conference Equipment Deals",
  description:
    "Special discounts on audio-visual equipment for conference organizers.",
  image: "https://picsum.photos/seed/ad2/800/600",
  link: "https://example.com/equipment",
  sponsor: "AV Solutions",
};
