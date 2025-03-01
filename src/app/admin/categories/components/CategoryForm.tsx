"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  mode: "create" | "edit";
  categoryId: number | null;
  onSuccess: () => void;
}

export default function CategoryForm({ mode, categoryId, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(mode === "edit");
  const supabase = createClient();
  useEffect(() => {
    if (mode === "edit" && categoryId) {
      fetchCategory();
    }
  }, [mode, categoryId]);

  async function fetchCategory() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (error) throw error;
      if (data) {
        setName(data.name);
        setDescription(data.description || "");
        setIsActive(data.is_active);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setInitialLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        const { error } = await supabase.from("categories").insert([
          {
            name,
            description,
            is_active: isActive,
          },
        ]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("categories")
          .update({
            name,
            description,
            is_active: isActive,
          })
          .eq("id", categoryId);
        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <div className="bg-zinc-800 rounded-lg shadow-md p-6 text-white">
        <div className="flex justify-center items-center h-40">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 rounded-lg shadow-md p-6 text-white"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-2 mt-1 block w-full rounded-md bg-zinc-700 h-10 border-zinc-600 text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="px-2 mt-1 block w-full rounded-md bg-zinc-700  border-zinc-600 text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500 outline-none"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 text-yellow-400 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm">Active</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
}
