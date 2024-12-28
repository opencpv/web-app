"use client";
import { greatVibes, lora } from "@/app/fonts/font";
interface CategoryPageHeroProps {
  title: string;
  description: string;
}
const CategoryPageHero = ({ title, description }: CategoryPageHeroProps) => {
  return (
    <section className="bg-zinc-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`${greatVibes.className} text-5xl mb-6`}>{title}</h1>
          <p className={`${lora.className} text-xl mb-8`}>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default CategoryPageHero;
