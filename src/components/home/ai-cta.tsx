"use client";
import { SectionHeading } from "../ui/title-text/section-heading";
import { Spacer } from "../ui/spacer";
const AiCta = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <div className="text-6xl mb-6">🤖✨</div>
            <SectionHeading text="AI-Powered Opportunity Matching" />
            <Spacer height={6} />
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
  );
};

export default AiCta;
