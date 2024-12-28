"use client";
import { lora } from "@/app/fonts/font";
import ButtonComponent from "../ui/button/Button";

const HeroSection = () => {
  return (
    <section className="bg-zinc-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={` text-5xl mb-6`}>Discover Your Next Opportunity</h1>
          <p className={`${lora.className} text-xl mb-8`}>
            Your gateway to hackathons, grants, scholarships, and career
            opportunities
          </p>
          <div className="flex gap-4 justify-center">
            <ButtonComponent text="Explore Opportunities" height="md" />
            <ButtonComponent text="Sign Up" variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
