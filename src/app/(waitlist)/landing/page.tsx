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
    days: 0,
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
    const targetDate = new Date("2025-01-15T00:00:00");

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
          {/* WhatsApp Group Link */}
          <div className="max-w-md mx-auto my-12">
            <a
              href="https://chat.whatsapp.com/CtILWEOJkFsCxhGBnS7S9m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition duration-300"
              onClick={() => {
                mixpanel.track("WhatsApp Group Clicked", {
                  location: "Waitlist Landing",
                });
              }}
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm6.357 17.357c-.882.883-1.922 1.523-3.07 1.91a9.91 9.91 0 01-3.287.55 9.91 9.91 0 01-3.287-.55c-1.149-.387-2.188-1.027-3.07-1.91a9.864 9.864 0 01-1.91-3.07A9.91 9.91 0 013.183 12a9.91 9.91 0 01.55-3.287c.387-1.149 1.027-2.188 1.91-3.07a9.864 9.864 0 013.07-1.91A9.91 9.91 0 0112 3.183a9.91 9.91 0 013.287.55c1.149.387 2.188 1.027 3.07 1.91a9.864 9.864 0 011.91 3.07 9.91 9.91 0 01.55 3.287c-.387 1.149-1.027 2.188-1.91 3.07z" />
              </svg>
              Join our WhatsApp Group for updates
            </a>
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
