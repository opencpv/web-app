"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import LinkPageCard from "@/components/cards/link-page-card";
import DashboardHeader from "./components/dashboard-header";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

const ModeratorDashboardPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const supabase = createClient();
  console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    setCategories(data || []);
  };

  return (
    <main className="min-h-screen bg-zinc-800">
      <DashboardHeader />

      <section className="container mx-auto  px-10">
        <h2 className="text-white text-xl font-semibold mb-6">Pages</h2>
        <Link href="/categories"></Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <LinkPageCard
            icon="📁"
            title="Categories"
            description="Manage your categories"
            clickable={true}
            link="dashboard/categories"
          />
          <LinkPageCard
            icon="🏆"
            title="Hackathons"
            description="Manage hackathon events"
            clickable={true}
            link="dashboard/hackathons"
          />
          <LinkPageCard
            icon="💰"
            title="Grants"
            description="Manage grant opportunities"
            clickable={true}
            link="dashboard/grants"
          />
        </div>
      </section>
    </main>
  );
};

export default ModeratorDashboardPage;
