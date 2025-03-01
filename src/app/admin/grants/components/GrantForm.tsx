import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import countriesJson from "@/data/countries.json";

interface GrantFormData {
  title: string;
  description: string;
  amount: string;
  deadline: string;
  organization: string;
  eligible_countries: string[];
  category: number | null;
  requirements: string[];
  image_url: string | null;
  application_process: string[];
  contact_info: {
    email: string;
    website: string;
  };
  timeline: { date: string; event: string }[];
  apply_link: string | null;
}

interface Category {
  id: number;
  name: string;
}

interface Props {
  mode: "create" | "edit";
  grantId?: string;
  onSuccess: () => void;
}

const initialFormData: GrantFormData = {
  title: "",
  description: "",
  amount: "",
  deadline: new Date().toISOString(),
  organization: "",
  eligible_countries: [],
  category: null,
  requirements: [],
  image_url: null,
  application_process: [],
  contact_info: {
    email: "",
    website: "",
  },
  timeline: [],
  apply_link: null,
};

const supabase = createClient();

export default function GrantForm({ mode, grantId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GrantFormData>(initialFormData);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const countries = countriesJson.countries.map((country) => ({
    value: country.name.common,
    label: country.name.common,
  }));

  useEffect(() => {
    fetchCategories();
    if (mode === "edit" && grantId) {
      fetchGrant(grantId);
    }
  }, [mode, grantId]);

  async function fetchCategories() {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }
    setCategories(data || []);
  }

  async function fetchGrant(id: string) {
    const { data, error } = await supabase
      .from("grants")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching grant:", error);
      return;
    }
    setFormData(data);
    setSelectedCountries(data.eligible_countries);
    setImagePreview(data.image_url);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const updatedFormData = {
      ...formData,
      eligible_countries: selectedCountries,
    };

    if (mode === "create") {
      const { error } = await supabase.from("grants").insert([updatedFormData]);
      if (error) {
        console.error("Error creating grant:", error);
        setLoading(false);
        return;
      }
    } else if (mode === "edit" && grantId) {
      const { error } = await supabase
        .from("grants")
        .update(updatedFormData)
        .eq("id", grantId);
      if (error) {
        console.error("Error updating grant:", error);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for grant data */}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="text"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="datetime-local"
          value={formData.deadline}
          onChange={(e) =>
            setFormData({ ...formData, deadline: e.target.value })
          }
        />
      </div>
      <div>
        <label>Organization</label>
        <input
          type="text"
          value={formData.organization}
          onChange={(e) =>
            setFormData({ ...formData, organization: e.target.value })
          }
        />
      </div>
      <div>
        <label>Eligible Countries</label>
        <select
          multiple
          value={selectedCountries}
          onChange={(e) =>
            setSelectedCountries(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Category</label>
        <select
          value={formData.category || ""}
          onChange={(e) =>
            setFormData({ ...formData, category: parseInt(e.target.value, 10) })
          }
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Requirements</label>
        <textarea
          value={formData.requirements.join("\n")}
          onChange={(e) =>
            setFormData({
              ...formData,
              requirements: e.target.value.split("\n"),
            })
          }
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          value={formData.image_url || ""}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />
      </div>
      <div>
        <label>Application Process</label>
        <textarea
          value={formData.application_process.join("\n")}
          onChange={(e) =>
            setFormData({
              ...formData,
              application_process: e.target.value.split("\n"),
            })
          }
        />
      </div>
      <div>
        <label>Contact Email</label>
        <input
          type="email"
          value={formData.contact_info.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              contact_info: { ...formData.contact_info, email: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label>Contact Website</label>
        <input
          type="url"
          value={formData.contact_info.website}
          onChange={(e) =>
            setFormData({
              ...formData,
              contact_info: {
                ...formData.contact_info,
                website: e.target.value,
              },
            })
          }
        />
      </div>
      <div>
        <label>Timeline</label>
        <textarea
          value={formData.timeline
            .map((item) => `${item.date}: ${item.event}`)
            .join("\n")}
          onChange={(e) =>
            setFormData({
              ...formData,
              timeline: e.target.value.split("\n").map((line) => {
                const [date, event] = line.split(": ");
                return { date, event };
              }),
            })
          }
        />
      </div>
      <div>
        <label>Apply Link</label>
        <input
          type="url"
          value={formData.apply_link || ""}
          onChange={(e) =>
            setFormData({ ...formData, apply_link: e.target.value })
          }
        />
      </div>
      <button type="submit" disabled={loading}>
        {mode === "create" ? "Create Grant" : "Update Grant"}
      </button>
    </form>
  );
}
