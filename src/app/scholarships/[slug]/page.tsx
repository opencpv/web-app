"use client";
import { greatVibes } from "../../fonts/font";
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
  // Additional fields for detailed view
  applicationProcess: string[];
  benefits: string[];
  eligibilityCriteria: {
    academic: string[];
    demographic: string[];
    other: string[];
  };
  timeline: {
    date: string;
    event: string;
  }[];
  contactInfo: {
    email: string;
    phone?: string;
    website: string;
  };
  faqs: {
    question: string;
    answer: string;
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

export default function ScholarshipPage() {
  // In a real app, you would fetch the scholarship data using the ID
  const scholarship = mockScholarship;

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={scholarship.image}
            alt={scholarship.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/scholarships"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Scholarships
            </Link>
            <h1 className={`${greatVibes.className} text-5xl mb-4`}>
              {scholarship.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {scholarship.amount}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                Deadline: {scholarship.deadline}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ad Banner */}
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

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  About This Scholarship
                </h2>
                <p className="text-gray-600">{scholarship.description}</p>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Benefits
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {scholarship.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Eligibility Criteria */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Eligibility Criteria
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Academic Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {scholarship.eligibilityCriteria.academic.map(
                        (req, index) => (
                          <li key={index}>{req}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Demographic Criteria
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {scholarship.eligibilityCriteria.demographic.map(
                        (req, index) => (
                          <li key={index}>{req}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Other Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {scholarship.eligibilityCriteria.other.map(
                        (req, index) => (
                          <li key={index}>{req}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  How to Apply
                </h2>
                <ol className="list-decimal list-inside space-y-4 text-gray-600">
                  {scholarship.applicationProcess.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className={`${greatVibes.className} text-3xl mb-4`}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {scholarship.faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Organization
                    </label>
                    <p className="font-medium">{scholarship.organization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium capitalize">
                      {scholarship.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Eligible Countries
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {scholarship.eligibleCountries.map((country) => (
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

              {/* Timeline */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Important Dates</h3>
                <div className="space-y-4">
                  {scholarship.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                        {item.date}
                      </div>
                      <div className="text-gray-600">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">
                      {scholarship.contactInfo.email}
                    </p>
                  </div>
                  {scholarship.contactInfo.phone && (
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">
                        {scholarship.contactInfo.phone}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={scholarship.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 block"
                    >
                      Visit Official Website
                    </a>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button className="w-full bg-yellow-400 text-black px-6 py-4 rounded-md hover:bg-yellow-500 transition duration-300 font-bold text-lg">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Mock data
const mockScholarship: Scholarship = {
  id: "1",
  title: "Global Excellence Scholarship 2024",
  description:
    "A prestigious scholarship program designed to support outstanding international students pursuing undergraduate or graduate studies. This scholarship aims to foster academic excellence and cultural diversity in higher education.",
  amount: "$25,000/year",
  deadline: "March 31, 2024",
  organization: "Global Education Foundation",
  eligibleCountries: ["All Countries"],
  category: "international",
  requirements: [
    "Academic excellence",
    "Leadership potential",
    "Community involvement",
  ],
  image: "https://picsum.photos/seed/scholarship1/1920/1080",
  benefits: [
    "Full tuition coverage",
    "Monthly stipend for living expenses",
    "Health insurance",
    "Annual book allowance",
    "Research/Conference travel grant",
    "Mentorship program access",
  ],
  eligibilityCriteria: {
    academic: [
      "Minimum GPA of 3.5/4.0 or equivalent",
      "Strong academic record",
      "Standardized test scores (if applicable)",
    ],
    demographic: [
      "Open to all nationalities",
      "Age limit: 35 years",
      "No gender restrictions",
    ],
    other: [
      "Leadership experience",
      "Community service involvement",
      "English language proficiency",
    ],
  },
  applicationProcess: [
    "Complete online application form",
    "Submit academic transcripts",
    "Provide letters of recommendation",
    "Write personal statement",
    "Submit proof of language proficiency",
    "Complete video interview if shortlisted",
  ],
  timeline: [
    { date: "Jan 15, 2024", event: "Applications Open" },
    { date: "Mar 31, 2024", event: "Application Deadline" },
    { date: "Apr 15, 2024", event: "Document Review" },
    { date: "May 1, 2024", event: "Interview Notifications" },
    { date: "May 15, 2024", event: "Final Decisions" },
  ],
  contactInfo: {
    email: "scholarships@globaledu.org",
    phone: "+1 (555) 123-4567",
    website: "https://example.com/scholarship",
  },
  faqs: [
    {
      question: "Can I apply if I'm already enrolled in a university?",
      answer:
        "Yes, both prospective and current students can apply for this scholarship.",
    },
    {
      question: "Is the scholarship renewable?",
      answer:
        "Yes, the scholarship can be renewed annually based on academic performance and meeting program requirements.",
    },
    {
      question: "Are part-time students eligible?",
      answer: "No, this scholarship is only available for full-time students.",
    },
  ],
};

const featuredAd: AdPlacement = {
  id: "featured-1",
  title: "Ace Your Scholarship Application",
  description:
    "Get expert guidance on writing winning scholarship essays and preparing your application. Special offer for students!",
  image: "https://picsum.photos/seed/scholarship-ad/800/600",
  link: "https://example.com/scholarship-guide",
  sponsor: "ScholarshipPro",
};
