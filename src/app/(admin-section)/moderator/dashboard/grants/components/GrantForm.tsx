"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
}

interface Timeline {
  date: string;
  event: string;
}

interface ContactInfo {
  email: string;
  website?: string;
}

interface GrantFormProps {
  grantId?: string;
  isEditing?: boolean;
}

const GrantForm = ({ grantId, isEditing = false }: GrantFormProps) => {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    amount: "",
    deadline: "",
    organization: "",
    eligible_countries: [] as string[],
    requirements: [] as string[],
    image_url: "",
    application_process: [] as string[],
    contact_info: {
      email: "",
      website: "",
    } as ContactInfo,
    timeline: [] as Timeline[],
    category: "",
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing && grantId) {
      fetchGrantData();
    }
  }, [grantId, isEditing]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .eq("is_active", true);

    if (error) {
      toast.error("Error fetching categories");
      return;
    }

    setCategories(data || []);
  };

  const fetchGrantData = async () => {
    const { data, error } = await supabase
      .from("grants")
      .select("*")
      .eq("id", grantId)
      .single();

    if (error) {
      toast.error("Error fetching grant data");
      return;
    }

    if (data) {
      setFormData({
        ...data,
        timeline: JSON.parse(data.timeline || "[]"),
        contact_info: JSON.parse(data.contact_info || "{}"),
      });
      if (data.image_url) setImagePreview(data.image_url);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    const values = e.target.value
      .split("\n")
      .filter((item) => item.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value,
      },
    }));
  };

  const handleTimelineChange = (
    index: number,
    field: keyof Timeline,
    value: string
  ) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      newTimeline[index] = { ...newTimeline[index], [field]: value };
      return { ...prev, timeline: newTimeline };
    });
  };

  const addTimelineItem = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { date: "", event: "" }],
    }));
  };

  const removeTimelineItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image_url: "" }));
  };

  const uploadFile = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("grant-images")
      .upload(`images/${Date.now()}-${file.name}`, file);

    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from("grant-images").getPublicUrl(data.path);

    return publicUrl;
  };

  const handleRequirementChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newRequirements = [...prev.requirements];
      newRequirements[index] = value;
      return { ...prev, requirements: newRequirements };
    });
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleEligibleCountryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newCountries = [...prev.eligible_countries];
      newCountries[index] = value;
      return { ...prev, eligible_countries: newCountries };
    });
  };

  const addEligibleCountry = () => {
    setFormData((prev) => ({
      ...prev,
      eligible_countries: [...prev.eligible_countries, ""],
    }));
  };

  const removeEligibleCountry = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      eligible_countries: prev.eligible_countries.filter((_, i) => i !== index),
    }));
  };

  const handleApplicationProcessChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newProcess = [...prev.application_process];
      newProcess[index] = value;
      return { ...prev, application_process: newProcess };
    });
  };

  const addApplicationProcess = () => {
    setFormData((prev) => ({
      ...prev,
      application_process: [...prev.application_process, ""],
    }));
  };

  const removeApplicationProcess = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      application_process: prev.application_process.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let image_url = formData.image_url;

      if (imageFile) {
        image_url = await uploadFile(imageFile);
      }

      const submitData = {
        ...formData,
        image_url,
        timeline: JSON.stringify(formData.timeline),
        contact_info: JSON.stringify(formData.contact_info),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("grants")
          .update(submitData)
          .eq("id", grantId);

        if (error) throw error;
        toast.success("Grant updated successfully");
      } else {
        const { error } = await supabase.from("grants").insert([submitData]);

        if (error) throw error;
        toast.success("Grant created successfully");
      }

      router.push("/moderator/dashboard/grants");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Title</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-zinc-700 rounded-md p-2"
            required
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
          <label className="block mb-2">Amount</label>
          <Input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Deadline</label>
          <Input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Organization</label>
          <Input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Image</label>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative w-full h-48 bg-zinc-800 rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Grant image preview"
                  fill
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={imagePreview ? "hidden" : ""}
            />
            {imagePreview && (
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>('input[type="file"]')
                    ?.click()
                }
                className="w-full py-2 px-4 bg-zinc-600 rounded-md hover:bg-zinc-500 transition-colors"
              >
                Change Image
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-2">Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          className="w-full bg-zinc-700 rounded-md p-2 min-h-[60px]"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full bg-zinc-700 rounded-md p-2 min-h-[100px]"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Requirements</label>
        {formData.requirements.map((requirement, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Requirement"
              value={requirement}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              required
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeRequirement(index)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        <Button text="Add Requirement" onClick={addRequirement} />
      </div>

      <div>
        <label className="block mb-2">Eligible Countries</label>
        {formData.eligible_countries.map((country, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) =>
                handleEligibleCountryChange(index, e.target.value)
              }
              required
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeEligibleCountry(index)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        <Button text="Add Country" onClick={addEligibleCountry} />
      </div>

      <div>
        <label className="block mb-2">Application Process</label>
        {formData.application_process.map((step, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Application Step"
              value={step}
              onChange={(e) =>
                handleApplicationProcessChange(index, e.target.value)
              }
              required
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeApplicationProcess(index)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        <Button text="Add Application Step" onClick={addApplicationProcess} />
      </div>

      <div>
        <label className="block mb-2">Timeline</label>
        {formData.timeline.map((item, index) => (
          <div className="w-full flex flex-row gap-4 items-center mb-4">
            <div className="w-[calc(100%-40px)]">
              <div className="w-full grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={item.date}
                  onChange={(e) =>
                    handleTimelineChange(index, "date", e.target.value)
                  }
                  required
                />
                <Input
                  type="text"
                  placeholder="Event"
                  value={item.event}
                  onChange={(e) =>
                    handleTimelineChange(index, "event", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() => removeTimelineItem(index)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors w-fit"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <Button text="Add Timeline Item" onClick={addTimelineItem} />
      </div>

      <div>
        <label className="block mb-2">Contact Information</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <Input
              type="email"
              value={formData.contact_info.email}
              onChange={(e) => handleContactInfoChange(e, "email")}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Website</label>
            <Input
              type="url"
              value={formData.contact_info.website}
              onChange={(e) => handleContactInfoChange(e, "website")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          text={
            isLoading
              ? "Saving..."
              : isEditing
              ? "Update Grant"
              : "Create Grant"
          }
        />
      </div>
    </form>
  );
};

export default GrantForm;
