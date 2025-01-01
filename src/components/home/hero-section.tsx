"use client";
import { greatVibes, lora } from "@/app/fonts/font";
import ButtonComponent from "../ui/button/Button";

export default function HeroSection() {
  return (
    <section className="bg-zinc-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`${greatVibes.className} text-5xl mb-6`}>
            Discover Your Next Opportunity
          </h1>
          <p className={`${lora.className} text-xl mb-8 text-gray-300`}>
            Your gateway to life-changing opportunities. Find and apply to the
            best hackathons, grants, and scholarships worldwide, all in one
            place.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-md hover:bg-yellow-500 transition duration-300">
              Get Started
            </button>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-md hover:bg-yellow-400 hover:text-black transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
