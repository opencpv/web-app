"use client";
import { greatVibes } from "../../fonts/font";
import Link from "next/link";

interface Workshop {
  id: string;
  title: string;
  description: string;
  price: string;
  date: string;
  organization: string;
  eligibleCountries: string[];
  category: string;
  requirements: string[];
  image: string;
  type: "online" | "in-person" | "hybrid";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  language: string;
  instructor: {
    name: string;
    title: string;
    expertise: string[];
    bio: string;
    image: string;
  };
  // Additional fields for the detailed view
  curriculum: {
    day: number;
    topics: string[];
    duration: string;
  }[];
  materials: string[];
  schedule: {
    date: string;
    time: string;
    activity: string;
  }[];
  location?: {
    address: string;
    city: string;
    country: string;
    venue: string;
    mapLink: string;
  };
  contactInfo: {
    email: string;
    website: string;
    phone?: string;
  };
  testimonials: {
    name: string;
    role: string;
    company: string;
    text: string;
    image: string;
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

export default function WorkshopPage() {
  // In a real app, you would fetch the workshop data using the ID
  const workshop = mockWorkshop;

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section with Workshop Image */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/workshops"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Workshops
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {workshop.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {workshop.price}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {workshop.date}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                {workshop.duration}
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

      {/* Workshop Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  About This Workshop
                </h2>
                <p className="text-gray-600">{workshop.description}</p>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Meet Your Instructor
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <img
                      src={workshop.instructor.image}
                      alt={workshop.instructor.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-2xl font-bold mb-2">
                      {workshop.instructor.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {workshop.instructor.title}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {workshop.instructor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {workshop.instructor.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Workshop Curriculum
                </h2>
                <div className="space-y-6">
                  {workshop.curriculum.map((day, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-yellow-400 pl-4"
                    >
                      <h3 className="text-xl font-bold mb-2">Day {day.day}</h3>
                      <p className="text-gray-600 mb-2">{day.duration}</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {day.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {workshop.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Inline Ad - Between Requirements and Schedule */}
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
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Detailed Schedule
                </h2>
                <div className="space-y-4">
                  {workshop.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 text-gray-600"
                    >
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                        {item.date} {item.time}
                      </div>
                      <div>{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Required Materials
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {workshop.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>

              {/* Location (if in-person) */}
              {workshop.type !== "online" && workshop.location && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                    Location
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {workshop.location.venue}
                      </h3>
                      <p className="text-gray-600">
                        {workshop.location.address}
                        <br />
                        {workshop.location.city}, {workshop.location.country}
                      </p>
                    </div>
                    <a
                      href={workshop.location.mapLink}
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
                  What Past Participants Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workshop.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        &quot;{testimonial.text}&quot;
                      </p>
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
                    <p className="font-medium">{workshop.organization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium capitalize">
                      {workshop.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    <p className="font-medium capitalize">{workshop.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Level</label>
                    <p className="font-medium capitalize">{workshop.level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Language</label>
                    <p className="font-medium capitalize">
                      {workshop.language}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Eligible Countries
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workshop.eligibleCountries.map((country) => (
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
                    <p className="font-medium">{workshop.contactInfo.email}</p>
                  </div>
                  {workshop.contactInfo.phone && (
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">
                        {workshop.contactInfo.phone}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={workshop.contactInfo.website}
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
const mockWorkshop: Workshop = {
  id: "1",
  title: "Advanced Web Development Workshop",
  description:
    "Master modern web development techniques with hands-on projects and expert guidance. This intensive workshop will take you through the latest tools, frameworks, and best practices in web development.",
  price: "$299",
  date: "April 30, 2024",
  organization: "Tech Academy",
  eligibleCountries: ["US", "UK", "Canada"],
  category: "programming",
  requirements: [
    "Basic HTML/CSS knowledge",
    "JavaScript fundamentals",
    "Git basics",
    "Laptop with development environment",
    "Node.js installed",
    "VS Code or similar IDE",
  ],
  image: "https://picsum.photos/seed/workshop1/800/600",
  type: "hybrid",
  level: "advanced",
  duration: "2 days",
  language: "english",
  instructor: {
    name: "Dr. Sarah Chen",
    title: "Senior Software Engineer",
    expertise: ["React", "Node.js", "Cloud Architecture"],
    bio: "Dr. Sarah Chen has over 15 years of experience in web development and has trained hundreds of developers worldwide. She specializes in modern JavaScript frameworks and cloud technologies.",
    image: "https://picsum.photos/seed/instructor1/200/200",
  },
  curriculum: [
    {
      day: 1,
      duration: "9:00 AM - 5:00 PM",
      topics: [
        "Modern JavaScript Features",
        "React Hooks and Best Practices",
        "State Management Solutions",
        "API Design and Integration",
        "Testing Strategies",
      ],
    },
    {
      day: 2,
      duration: "9:00 AM - 5:00 PM",
      topics: [
        "Cloud Deployment",
        "Performance Optimization",
        "Security Best Practices",
        "CI/CD Pipeline Setup",
        "Project Showcase",
      ],
    },
  ],
  materials: [
    "Workshop handbook",
    "Code samples and exercises",
    "Development environment setup guide",
    "Cloud platform access",
    "Certificate of completion",
  ],
  schedule: [
    {
      date: "April 30, 2024",
      time: "8:30 AM",
      activity: "Registration and Setup",
    },
    {
      date: "April 30, 2024",
      time: "9:00 AM",
      activity: "Welcome and Introduction",
    },
    {
      date: "April 30, 2024",
      time: "10:00 AM",
      activity: "Modern JavaScript Deep Dive",
    },
    {
      date: "April 30, 2024",
      time: "12:00 PM",
      activity: "Lunch Break",
    },
    {
      date: "April 30, 2024",
      time: "1:00 PM",
      activity: "React Advanced Concepts",
    },
    {
      date: "April 30, 2024",
      time: "3:00 PM",
      activity: "Hands-on Project Work",
    },
    {
      date: "April 30, 2024",
      time: "5:00 PM",
      activity: "Day 1 Wrap-up",
    },
    {
      date: "May 1, 2024",
      time: "9:00 AM",
      activity: "Day 2 Introduction",
    },
    {
      date: "May 1, 2024",
      time: "10:00 AM",
      activity: "Cloud Technologies",
    },
    {
      date: "May 1, 2024",
      time: "12:00 PM",
      activity: "Lunch Break",
    },
    {
      date: "May 1, 2024",
      time: "1:00 PM",
      activity: "Performance and Security",
    },
    {
      date: "May 1, 2024",
      time: "3:00 PM",
      activity: "Final Project Work",
    },
    {
      date: "May 1, 2024",
      time: "5:00 PM",
      activity: "Project Showcase and Closing",
    },
  ],
  location: {
    address: "123 Tech Street",
    city: "San Francisco",
    country: "United States",
    venue: "Tech Academy Conference Center",
    mapLink: "https://maps.example.com/tech-academy",
  },
  contactInfo: {
    email: "workshops@techacademy.com",
    website: "https://techacademy.com/workshops",
    phone: "+1 (555) 123-4567",
  },
  testimonials: [
    {
      name: "John Smith",
      role: "Frontend Developer",
      company: "Tech Solutions Inc.",
      text: "The workshop was incredibly valuable. I learned advanced React patterns that I'm now using in my projects.",
      image: "https://picsum.photos/seed/testimonial1/100/100",
    },
    {
      name: "Emma Wilson",
      role: "Full Stack Developer",
      company: "Digital Innovations",
      text: "Dr. Chen's expertise and teaching style made complex concepts easy to understand. Highly recommended!",
      image: "https://picsum.photos/seed/testimonial2/100/100",
    },
  ],
};

// Mock ad data
const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Launch Your Learning Journey with WorkshopHub Pro",
  description:
    "Get unlimited access to workshop opportunities, learning resources, and expert guidance. Special offer: 3 months free!",
  image: "https://picsum.photos/seed/featured-ad/800/600",
  link: "https://example.com/special-offer",
  sponsor: "WorkshopHub Pro",
};

const inlineAd1: AdPlacement = {
  id: "inline-1",
  title: "Workshop Preparation Guide",
  description:
    "Get ready for your workshop with our comprehensive preparation guide.",
  image: "https://picsum.photos/seed/ad1/800/600",
  link: "https://example.com/guide",
  sponsor: "Learning Academy",
};

const sidebarAd: AdPlacement = {
  id: "sidebar-1",
  title: "Development Tools Bundle",
  description:
    "Special discounts on essential development tools for workshop participants.",
  image: "https://picsum.photos/seed/ad2/800/600",
  link: "https://example.com/tools",
  sponsor: "DevTools Solutions",
};
