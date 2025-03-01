"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";

interface Props {
  onEdit: (id: string) => void;
}

interface Grant {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  // Add other grant properties as needed
}

const supabase = createClient();

export default function GrantList({ onEdit }: Props) {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrants();
  }, []);

  async function fetchGrants() {
    const { data, error } = await supabase
      .from("grants")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching grants");
      return;
    }

    setGrants(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this grant?")) {
      const { error } = await supabase.from("grants").delete().eq("id", id);

      if (error) {
        toast.error("Error deleting grant");
        return;
      }

      toast.success("Grant deleted");
      fetchGrants();
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {grants.map((grant: any) => (
        <div
          key={grant.id}
          className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">{grant.title}</h3>
            <p className="text-gray-600">{grant.organization}</p>
            <p className="text-sm text-gray-500">
              Deadline: {new Date(grant.deadline).toLocaleDateString()}
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(grant.id)}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(grant.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
