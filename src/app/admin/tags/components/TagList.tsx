"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Tag {
  id: number;
  name: string;
  created_at: string;
}

interface Props {
  onEdit: (id: number) => void;
}

export default function TagList({ onEdit }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("name");

      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this tag?")) return;

    try {
      const { error } = await supabase.from("tags").delete().eq("id", id);
      if (error) throw error;
      await fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  }

  if (loading) {
    return (
      <div className="bg-zinc-800 rounded-lg shadow-md p-6 text-white">
        <div className="flex justify-center items-center h-40">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-zinc-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700">
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td className="px-6 py-4 text-white">{tag.name}</td>
              <td className="px-6 py-4 text-white">
                {new Date(tag.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <button
                  onClick={() => onEdit(tag.id)}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
