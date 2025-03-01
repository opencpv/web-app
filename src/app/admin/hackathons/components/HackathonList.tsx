"use client";
import { useEffect, useState } from "react";
import { HackathonDetailed } from "@/lib/types";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";

interface Props {
  onEdit: (id: string) => void;
}

export default function HackathonList({ onEdit }: Props) {
  const [hackathons, setHackathons] = useState<HackathonDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchHackathons();
  }, []);

  async function fetchHackathons() {
    const { data, error } = await supabase
      .from("hackathons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching hackathons:", error);
      return;
    }

    setHackathons(data);
    setLoading(false);
  }

  async function deleteHackathon(id: string) {
    if (!confirm("Are you sure you want to delete this hackathon?")) return;

    const { error } = await supabase.from("hackathons").delete().eq("id", id);

    if (error) {
      console.error("Error deleting hackathon:", error);
      return;
    }

    fetchHackathons();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organizer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {hackathons.map((hackathon) => (
            <tr key={hackathon.id}>
              <td className="px-6 py-4 whitespace-nowrap">{hackathon.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {hackathon.organizer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(hackathon.deadline), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{hackathon.mode}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => onEdit(hackathon.id)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHackathon(hackathon.id)}
                  className="text-red-600 hover:text-red-900"
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
