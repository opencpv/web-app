"use client";
import { greatVibes } from "@/app/fonts/font";
import featuredOpportunities from "@/data/featured-opportunities";
import FeaturedCard from "../cards/featured-card";
const FeaturedSection = () => {
  return (
    <section className="bg-zinc-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className={`${greatVibes.className} text-4xl text-center mb-12`}>
          Featured Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredOpportunities.map((opportunity, index) => (
            <FeaturedCard
              key={index}
              image={opportunity.image}
              title={opportunity.title}
              description={opportunity.description}
              deadline={opportunity.deadline}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
