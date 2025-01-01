"use client";
import { useState, useEffect } from "react";
import { greatVibes } from "@/app/fonts/font";
import { SectionHeading } from "@/components/ui/title-text/section-heading";
import { Spacer } from "@/components/ui/spacer";
import categories from "@/data/categories";
import CategoryCard from "@/components/cards/category-card";
import mixpanel from "@/lib/mixpanel";

export default function WaitlistLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    mixpanel.track("Page Viewed", {
      page: "Waitlist Landing",
    });
  }, []);

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

  useEffect(() => {
    // Add stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href =
      "https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css";
    document.head.appendChild(link);

    // Add script
    const script = document.createElement("script");
    script.src =
      "https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
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
            We&apos;re working hard to bring you the ultimate experience in
            finding opportunities. Join our waitlist to be the first to know
            when we launch!
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
            <div
              id="getWaitlistContainer"
              data-waitlist_id="23543"
              data-widget_type="WIDGET_3"
            />
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
