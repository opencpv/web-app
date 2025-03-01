"use client";
import { useEffect, useState } from "react";
import { greatVibes, lora } from "../fonts/font";
import { createClient } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const supabase = createClient();

interface Grant {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  organization: string;
  eligible_countries: string[];
  category: number;
  requirements: string[];
  image_url: string | null;
  application_process: string[];
  contact_info: {
    email: string;
    website: string;
  };
  timeline: Array<{
    date: string;
    event: string;
  }>;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
}

interface Filters {
  country: string;
  category: number | null;
  minAmount: string;
  maxAmount: string;
}

export default function GrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const router = useRouter();
  
  const [filters, setFilters] = useState<Filters>({
    country: "",
    category: null,
    minAmount: "",
    maxAmount: "",
  });
  
  const [sortBy, setSortBy] = useState<"deadline" | "amount">("deadline");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchCategories();
    fetchGrants();
  }, []);

  useEffect(() => {
    fetchGrants();
  }, [filters, sortBy]);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }

    setCategories(data || []);
  }

  async function fetchGrants() {
    setLoading(true);
    let query = supabase
      .from('grants')
      .select('*')
      .eq('is_active', true);

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.country) {
      query = query.contains('eligible_countries', [filters.country]);
    }

    if (filters.minAmount || filters.maxAmount) {
      // Convert amount string to number for comparison
      // Remove currency symbols and commas, then parse as float
      query = query.filter('amount', 'not.eq', null);
     
      if (filters.minAmount) {
        query = query.filter('amount', 'gte', filters.minAmount);
      }
      if (filters.maxAmount) {
        query = query.filter('amount', 'lte', filters.maxAmount);
      }
    }

    // Apply sorting
    if (sortBy === 'deadline') {
      query = query.order('deadline', { ascending: true });
    } else if (sortBy === 'amount') {
      // Note: This is a simplified sort. You might need to implement custom sorting logic
      // for amount strings containing currency symbols
      query = query.order('amount', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Post-process the results for amount filtering if needed
    let filteredData = data || [];
    if (filters.minAmount || filters.maxAmount) {
      const processAmount = (amount: string) => 
        parseFloat(amount.replace(/[$,]/g, ''));

      filteredData = filteredData.filter(grant => {
        const grantAmount = processAmount(grant.amount);
        const min = filters.minAmount ? processAmount(filters.minAmount) : 0;
        const max = filters.maxAmount ? processAmount(filters.maxAmount) : Infinity;
        return grantAmount >= min && grantAmount <= max;
      });
    }

    setGrants(filteredData);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`${greatVibes.className} text-5xl mb-6`}>Grants</h1>
            <p className={`${lora.className} text-xl mb-8`}>
              Find grants and funding opportunities matching your requirements
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12 flex-wrap">
          <h2 className={`${greatVibes.className} text-4xl`}>
            Filter Opportunities
          </h2>

          {/* View Toggle */}
          <div className="bg-white rounded-lg shadow-md p-1 border-2 border-transparent">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Grid
              </span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                List
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Eligibility
              </label>
              <select
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                className="w-full p-3 border rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
              >
                <option value="">All Countries</option>
                {Array.from(
                  new Set(grants.flatMap((grant) => grant.eligible_countries))
                ).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category?.toString() || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Range
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Min"
                  value={filters.minAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, minAmount: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Max"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, maxAmount: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "deadline" | "amount")}
                className="w-full p-2 border rounded-md"
              >
                <option value="deadline">Deadline</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grants List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Error loading grants: {error.message}
          </div>
        ) : (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "grid grid-cols-1 gap-8"
            }`}
          >
            {grants.map((grant) => (
              <div
                key={grant.id}
                className={`bg-zinc-700 text-white rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition duration-300 flex ${
                  viewMode === "list" ? "flex-row" : "flex-col"
                }`}
              >
                <div
                  className={`${
                    viewMode === "list" ? "w-72" : "h-48"
                  } bg-gray-300 relative`}
                >
                  <img
                    src={grant.image_url || '/placeholder-image.jpg'}
                    alt={grant.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {grant.amount}
                  </div>
                </div>

                <div className="p-6 flex flex-col h-full flex-grow">
                  <h2 className="text-xl font-bold mb-3">{grant.title}</h2>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {grant.description.slice(0, 100)}...
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⏰</span>
                      <span className="text-gray-300">
                        {format(new Date(grant.deadline), 'PPP')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">🏢</span>
                      <span className="text-gray-300">
                        {grant.organization}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-zinc-600">
                      <div className="flex flex-wrap gap-2">
                        {grant.eligible_countries.map((country) => (
                          <span
                            key={country}
                            className="bg-zinc-600 px-3 py-1 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition duration-300"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-300 mt-4"
                     onClick={() => {
                      router.push(
                        `/grants/${grant.id}?title=${grant.title}`
                      );
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}