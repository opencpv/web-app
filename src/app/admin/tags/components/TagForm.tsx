"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  mode: "create" | "edit";
  tagId: number | null;
  onSuccess: () => void;
}

export default function TagForm({ mode, tagId, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(mode === "edit");
  const supabase = createClient();

  useEffect(() => {
    if (mode === "edit" && tagId) {
      fetchTag();
    }
  }, [mode, tagId]);

  async function fetchTag() {
    try {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .eq("id", tagId)
        .single();

      if (error) throw error;
      if (data) {
        setName(data.name);
      }
    } catch (error) {
      console.error("Error fetching tag:", error);
    } finally {
      setInitialLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        const { error } = await supabase.from("tags").insert([{ name }]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tags")
          .update({ name })
          .eq("id", tagId);
        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving tag:", error);
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
            maxLength={50}
            className="px-2 mt-1 block w-full rounded-md bg-zinc-700 h-10 border-zinc-600 text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500 outline-none"
          />
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
