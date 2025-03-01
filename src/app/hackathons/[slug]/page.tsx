"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  prize_pool: string;
  deadline: string;
  organizer: string;
  mode: string;
  requirements: string[];
  image_url: string;
  team_size: string;
  duration: string;
  schedule: { date: string; event: string }[];
  prizes: { place: string; amount: string; description: string }[];
  rules: string[];
  resources: { title: string; link: string }[];
  contact_info: {
    email: string;
    discord?: string;
    website: string;
  };
  banner: string;
  category: number | null;
  link: string;
  hackathon_tags: string[];
  summary: string;
}

const supabase = createClient();

export default function HackathonPage() {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      fetchHackathon(slug as string);
    }
  }, [slug]);

  async function fetchHackathon(id: string) {
    const { data, error } = await supabase
      .from("hackathons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching hackathon:", error);
      return;
    }

    setHackathon(data);
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;
  if (!hackathon) return <div>Hackathon not found</div>;

  return (
    <main className="min-h-screen bg-zinc-100">
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={hackathon.banner}
            alt={hackathon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <Link
              href="/hackathons"
              className="inline-flex items-center text-yellow-400 mb-4 hover:text-yellow-300"
            >
              ← Back to Hackathons
            </Link>
            <h1 className="text-5xl mb-4">{hackathon.title}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {hackathon.prize_pool}
              </span>
              <span className="bg-zinc-700 px-4 py-2 rounded-full">
                Deadline: {new Date(hackathon.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl mb-4">About This Hackathon</h2>
                <p className="text-gray-600">{hackathon.description}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {hackathon.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl mb-4">Schedule</h2>
                <div className="space-y-4">
                  {hackathon.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 text-gray-600"
                    >
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                        {item.date}
                      </div>
                      <div>{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl mb-4">Prizes</h2>
                <div className="space-y-4">
                  {hackathon.prizes.map((prize, index) => (
                    <>
                      <div
                        key={index}
                        className="flex items-start gap-4 text-gray-600"
                      >
                        <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                          {prize.place}
                        </div>
                        <div>{prize.amount}</div>
                      </div>
                      <p>{prize.description}</p>
                    </>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl mb-4">Rules</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {hackathon.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Organizer</label>
                    <p className="font-medium">{hackathon.organizer}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Mode</label>
                    <p className="font-medium capitalize">{hackathon.mode}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Team Size</label>
                    <p className="font-medium">{hackathon.team_size}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Duration</label>
                    <p className="font-medium">{hackathon.duration}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">
                      {hackathon.contact_info.email}
                    </p>
                  </div>
                  {hackathon.contact_info.discord && (
                    <div>
                      <label className="text-sm text-gray-500">Discord</label>
                      <p className="font-medium">
                        {hackathon.contact_info.discord}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <a
                      href={hackathon.contact_info.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 block font-medium"
                    >
                      Visit Official Website
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl mb-4">Resources</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {hackathon.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Register Button */}
              <button
                className="fixed bottom-0 right-0 w-full bg-yellow-400 text-black px-6 py-4 rounded-md hover:bg-yellow-500 transition duration-300 font-bold text-lg"
                onClick={() => window.open(hackathon.link, "_blank")}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
