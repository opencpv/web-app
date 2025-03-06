"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import DashboardHeader from "../components/dashboard-header";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  prize_pool: string;
  deadline: string;
  organizer: string;
  mode: string;
  team_size: string;
  duration: string;
  created_at: string;
  image_url: string | null;
  banner: string | null;
  summary: string | null;
  category: number | null;
}

interface Category {
  id: number;
  name: string;
}

const HackathonsPage = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hackathonsResult, categoriesResult] = await Promise.all([
        supabase
          .from("hackathons")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("categories").select("id, name"),
      ]);

      if (hackathonsResult.error) throw hackathonsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setHackathons(hackathonsResult.data || []);

      const categoryMap = (categoriesResult.data || []).reduce(
        (acc: Record<number, string>, cat: Category) => {
          acc[cat.id] = cat.name;
          return acc;
        },
        {}
      );
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-800">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Hackathons</h1>
          <Link href="/moderator/dashboard/hackathons/create">
            <Button text="Create Hackathon" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="bg-zinc-700 rounded-lg overflow-hidden hover:bg-zinc-600 transition-colors"
              >
                {hackathon.banner && (
                  <div className="relative w-full h-40">
                    <Image
                      src={hackathon.banner}
                      alt={hackathon.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <Link
                    href={`/moderator/dashboard/hackathons/${hackathon.id}`}
                  >
                    <div className="flex items-start gap-4">
                      {hackathon.image_url && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={hackathon.image_url}
                            alt={hackathon.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {hackathon.title}
                        </h3>
                        {hackathon.category && (
                          <span className="inline-block bg-zinc-800 text-white text-sm px-2 py-1 rounded mb-2">
                            {categories[hackathon.category]}
                          </span>
                        )}
                        {hackathon.summary ? (
                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                            {hackathon.summary}
                          </p>
                        ) : (
                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                            {hackathon.description}
                          </p>
                        )}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400 block">
                              Prize Pool
                            </span>
                            <span className="text-white">
                              {hackathon.prize_pool}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">
                              Deadline
                            </span>
                            <span className="text-white">
                              {format(
                                new Date(hackathon.deadline),
                                "MMM dd, yyyy"
                              )}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">
                              Team Size
                            </span>
                            <span className="text-white">
                              {hackathon.team_size}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Mode</span>
                            <span className="text-white">{hackathon.mode}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default HackathonsPage;
