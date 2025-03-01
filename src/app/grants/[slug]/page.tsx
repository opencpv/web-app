/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

interface Grant {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  organization: string;
  eligible_countries: string[];
  category: any;
  image_url: string;
  requirements: string[];
  application_process: string[];
  apply_link: string;
  contact_info: {
    email: string;
    website: string;
  };
  timeline: {
    date: string;
    event: string;
  }[];
}

const supabase = createClient();
const GrantPage = () => {
  const [grant, setGrant] = useState<Grant | null>(null);
  const [loading, setLoading] = useState(true);
  const [formattedDeadline, setFormattedDeadline] = useState<string | null>(
    null
  );
  const { slug } = useParams();

  useEffect(() => {
    setLoading(() => true);
    const fetchGrant = async () => {
      if (slug) {
        const { data, error } = await supabase
          .from("grants")
          .select("*,category(*)")
          .eq("id", slug)
          .single();
        setGrant(data);

        if (error) {
          console.error("Error fetching grant:", error);
          return;
        }
        console.log(data);
        setLoading(() => false);
      }
    };

    fetchGrant();
  }, [slug]);

  useEffect(() => {
    if (grant) {
      setFormattedDeadline(new Date(grant.deadline).toLocaleDateString());
    }
  }, [grant]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (grant) {
    return (
      <main className="min-h-screen bg-zinc-100">
        <section className="relative h-96">
          <div className="absolute inset-0">
            <img
              src={grant.image_url}
              alt={grant.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <div className="text-white">
              <Link
                href="/grants"
                className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
              >
                ← Back to Grants
              </Link>
              <h1 className={`text-5xl mb-4 `}>{grant.title}</h1>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                  {grant.amount}
                </span>
                {formattedDeadline && (
                  <span className="bg-zinc-700 px-4 py-2 rounded-full">
                    Deadline: {formattedDeadline}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className={`text-3xl mb-4`}>About This Grant</h2>
                  <p className="text-gray-600">{grant.description}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl mb-4">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {grant.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className={`text-3xl mb-4`}>Application Process</h2>
                  <ol className="list-decimal list-inside space-y-4 text-gray-600">
                    {grant.application_process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className={`text-3xl mb-4`}>Important Dates</h2>
                  <div className="space-y-4">
                    {grant.timeline.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 text-gray-600"
                      >
                        <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                        <div>{item.event}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">
                        Organization
                      </label>
                      <p className="font-medium">{grant.organization}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Category</label>
                      <p className="font-medium capitalize">
                        {grant.category.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Eligible Countries
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {grant.eligible_countries.map((country) => (
                          <span
                            key={country}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{grant.contact_info.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Website</label>
                      <a
                        href={grant.contact_info.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-700 block"
                      >
                        Visit Official Website
                      </a>
                    </div>
                  </div>
                </div>
                {/* Register Button */}
                <button
                  className="fixed bottom-0 right-0 w-full bg-yellow-400 text-black px-6 py-4 rounded-md hover:bg-yellow-500 transition duration-300 font-bold text-lg"
                  onClick={() => window.open(grant.apply_link, "_blank")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default GrantPage;
