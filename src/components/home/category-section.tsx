"use client";
import { greatVibes } from "@/app/fonts/font";
import Link from "next/link";
import categories from "@/data/categories";
import CategoryCard from "../cards/category-card";
import { SectionHeading } from "../ui/title-text/section-heading";
import { Spacer } from "../ui/spacer";

const CategorySection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <SectionHeading text=" Explore Categories" />
      <Spacer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            title={category.title}
            description={category.description}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
