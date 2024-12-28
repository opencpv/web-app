"use client";
import { greatVibes } from "@/app/fonts/font";
const NewsletterSection = () => {
  return (
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
  );
};

export default NewsletterSection;
