"use client";
import { useState, useEffect } from "react";
import { greatVibes } from "@/app/fonts/font";
import NewsletterSection from "@/components/home/newsletter-section";
import { SectionHeading } from "@/components/ui/title-text/section-heading";
import { Spacer } from "@/components/ui/spacer";
import categories from "@/data/categories";
import CategoryCard from "@/components/cards/category-card";

export default function WaitlistLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="bg-zinc-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className={`${greatVibes.className} text-5xl md:text-7xl mb-6`}>
            Coming Soon
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            We're working hard to bring you the ultimate experience in finding
            opportunities. Join our waitlist to be the first to know when we
            launch!
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-zinc-700 p-6 rounded-lg hover:transform hover:scale-105 transition duration-300"
              >
                <div className="text-4xl font-bold text-yellow-400">
                  {value}
                </div>
                <div className="text-gray-400 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Early Access Form */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-md hover:bg-yellow-500 transition duration-300 whitespace-nowrap">
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Curated Opportunities</h3>
            <p className="text-gray-600">
              Discover the best opportunities tailored to your profile and
              interests.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Training</h3>
            <p className="text-gray-600">
              Curated training for grant writing, CV writing, and more.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Get personalized recommendations based on your profile.
            </p>
          </div>
        </div>
      </section>
      {/* categories section */}
      <section className="py-16   bg-zinc-800">
        <div className="container mx-auto px-4 text-white">
          <SectionHeading text=" Opportunity Categories" />
          <Spacer />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                clickable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Elevate Access. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
