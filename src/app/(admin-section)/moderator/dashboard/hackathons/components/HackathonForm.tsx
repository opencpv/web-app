"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Category {
  id: number;
  name: string;
}

interface HackathonFormProps {
  hackathonId?: string;
  isEditing?: boolean;
}

interface Schedule {
  date: string;
  event: string;
}

interface Prize {
  rank: string;
  amount: string;
  description?: string;
}

interface Resource {
  title: string;
  link: string;
  description: string;
}

interface ContactInfo {
  email: string;
  phone?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    discord?: string;
  };
}

const HackathonForm = ({
  hackathonId,
  isEditing = false,
}: HackathonFormProps) => {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prize_pool: "",
    deadline: "",
    organizer: "",
    mode: "ONLINE",
    requirements: [] as string[],
    image_url: "",
    banner: "",
    team_size: "",
    duration: "",
    schedule: [] as Schedule[],
    prizes: [] as Prize[],
    rules: [] as string[],
    resources: [] as Resource[],
    contact_info: {
      email: "",
      phone: "",
      website: "",
      social: {
        twitter: "",
        linkedin: "",
        discord: "",
      },
    } as ContactInfo,
    category: "",
    summary: "",
    link: "",
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing && hackathonId) {
      fetchHackathonData();
    }
  }, [hackathonId, isEditing]);

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

  const fetchHackathonData = async () => {
    const { data, error } = await supabase
      .from("hackathons")
      .select("*")
      .eq("id", hackathonId)
      .single();

    if (error) {
      toast.error("Error fetching hackathon data");
      return;
    }

    if (data) {
      setFormData({
        ...data,
        schedule: data.schedule || [],
        prizes: data.prizes || [],
        resources: data.resources || [],
        contact_info: data.contact_info || { email: "", social: {} },
      });
      if (data.image_url) setImagePreview(data.image_url);
      if (data.banner) setBannerPreview(data.banner);

      console.log(data);
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

  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    subfield?: string
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact_info: subfield
        ? {
            ...prev.contact_info,
            social: {
              ...prev.contact_info.social,
              [subfield]: value,
            },
          }
        : {
            ...prev.contact_info,
            [field]: value,
          },
    }));
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

  const handleRuleChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newRules = [...prev.rules];
      newRules[index] = value;
      return { ...prev, rules: newRules };
    });
  };

  const addRule = () => {
    setFormData((prev) => ({
      ...prev,
      rules: [...prev.rules, ""],
    }));
  };

  const removeRule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof Schedule,
    value: string
  ) => {
    setFormData((prev) => {
      const newSchedule = [...prev.schedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      return { ...prev, schedule: newSchedule };
    });
  };

  const addScheduleItem = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { date: "", event: "" }],
    }));
  };

  const removeScheduleItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handlePrizeChange = (
    index: number,
    field: keyof Prize,
    value: string
  ) => {
    setFormData((prev) => {
      const newPrizes = [...prev.prizes];
      newPrizes[index] = { ...newPrizes[index], [field]: value };
      return { ...prev, prizes: newPrizes };
    });
  };

  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, { rank: "", amount: "", description: "" }],
    }));
  };

  const handleResourceChange = (
    index: number,
    field: keyof Resource,
    value: string
  ) => {
    setFormData((prev) => {
      const newResources = [...prev.resources];
      newResources[index] = { ...newResources[index], [field]: value };
      return { ...prev, resources: newResources };
    });
  };

  const addResource = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, { title: "", link: "", description: "" }],
    }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    if (type === "image") {
      setImageFile(file);
      setImagePreview(previewUrl);
    } else {
      setBannerFile(file);
      setBannerPreview(previewUrl);
    }
  };

  const removeImage = (type: "image" | "banner") => {
    if (type === "image") {
      setImageFile(null);
      setImagePreview(null);
      setFormData((prev) => ({ ...prev, image_url: "" }));
    } else {
      setBannerFile(null);
      setBannerPreview(null);
      setFormData((prev) => ({ ...prev, banner: "" }));
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from("hackathon-images")
      .upload(path, file);

    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from("hackathon-images").getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let image_url = formData.image_url;
      let banner = formData.banner;

      if (imageFile) {
        image_url = await uploadFile(
          imageFile,
          `images/${Date.now()}-${imageFile.name}`
        );
      }
      if (bannerFile) {
        banner = await uploadFile(
          bannerFile,
          `banners/${Date.now()}-${bannerFile.name}`
        );
      }

      const submitData = {
        ...formData,
        image_url,
        banner,
        schedule: JSON.stringify(formData.schedule),
        prizes: JSON.stringify(formData.prizes),
        resources: JSON.stringify(formData.resources),
        contact_info: JSON.stringify(formData.contact_info),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("hackathons")
          .update(submitData)
          .eq("id", hackathonId);

        if (error) throw error;
        toast.success("Hackathon updated successfully");
      } else {
        const { error } = await supabase
          .from("hackathons")
          .insert([submitData]);

        if (error) throw error;
        toast.success("Hackathon created successfully");
      }

      router.push("/moderator/dashboard/hackathons");
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
          <label className="block mb-2">Prize Pool</label>
          <Input
            type="text"
            name="prize_pool"
            value={formData.prize_pool}
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
          <label className="block mb-2">Team Size</label>
          <Input
            type="text"
            name="team_size"
            value={formData.team_size}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Duration</label>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Mode</label>
          <select
            name="mode"
            value={formData.mode}
            onChange={handleInputChange}
            className="w-full bg-zinc-700 rounded-md p-2"
            required
          >
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Organizer</label>
          <Input
            type="text"
            name="organizer"
            value={formData.organizer}
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
                  alt="Hackathon image preview"
                  fill
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => removeImage("image")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
              className={imagePreview ? "hidden" : ""}
            />
            {imagePreview && (
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>(
                      'input[type="file"][accept="image/*"]'
                    )
                    ?.click()
                }
                className="w-full py-2 px-4 bg-zinc-600 rounded-md hover:bg-zinc-500 transition-colors"
              >
                Change Image
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2">Banner</label>
          <div className="space-y-4">
            {bannerPreview && (
              <div className="relative w-full h-48 bg-zinc-800 rounded-lg overflow-hidden">
                <Image
                  src={bannerPreview}
                  alt="Hackathon banner preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage("banner")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "banner")}
              className={bannerPreview ? "hidden" : ""}
            />
            {bannerPreview && (
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>(
                      'input[type="file"][accept="image/*"]:last-of-type'
                    )
                    ?.click()
                }
                className="w-full py-2 px-4 bg-zinc-600 rounded-md hover:bg-zinc-500 transition-colors"
              >
                Change Banner
              </button>
            )}
          </div>
        </div>
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
        <label className="block mb-2">Rules</label>
        {formData.rules.map((rule, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Rule"
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              required
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeRule(index)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        <Button text="Add Rule" onClick={addRule} />
      </div>

      <div>
        <label className="block mb-2">Schedule</label>
        {formData.schedule.map((item, index) => (
          <div
            className="w-full flex flex-row gap-4 items-center mb-4"
            key={index}
          >
            <div className="w-[calc(100%-40px)]">
              <div key={index} className="w-full grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={item.date.split("T")[0]}
                  onChange={(e) =>
                    handleScheduleChange(index, "date", e.target.value)
                  }
                  required
                />
                <Input
                  type="text"
                  placeholder="Event"
                  value={item.event}
                  onChange={(e) =>
                    handleScheduleChange(index, "event", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() => removeScheduleItem(index)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors w-fit"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <Button text="Add Schedule Item" onClick={addScheduleItem} />
      </div>

      <div>
        <label className="block mb-2">Prizes</label>
        {formData.prizes.map((prize, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <Input
              type="text"
              placeholder="Rank"
              value={prize.rank}
              onChange={(e) => handlePrizeChange(index, "rank", e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Amount"
              value={prize.amount}
              onChange={(e) =>
                handlePrizeChange(index, "amount", e.target.value)
              }
              required
            />
            <Input
              type="text"
              placeholder="Description"
              value={prize.description}
              onChange={(e) =>
                handlePrizeChange(index, "description", e.target.value)
              }
              required
            />
          </div>
        ))}
        <Button text="Add Prize" onClick={addPrize} />
      </div>

      <div>
        <label className="block mb-2">Resources</label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <Input
              type="text"
              placeholder="Title"
              value={resource.title}
              onChange={(e) =>
                handleResourceChange(index, "title", e.target.value)
              }
              required
            />
            <Input
              type="url"
              placeholder="Link"
              value={resource.link}
              onChange={(e) =>
                handleResourceChange(index, "link", e.target.value)
              }
              required
            />
            <Input
              type="text"
              placeholder="Description"
              value={resource.description}
              onChange={(e) =>
                handleResourceChange(index, "description", e.target.value)
              }
              required
            />
          </div>
        ))}
        <Button text="Add Resource" onClick={addResource} />
      </div>

      <div>
        <label className="block mb-2">Contact Information</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.contact_info.email}
            onChange={(e) => handleContactInfoChange(e, "email")}
            required
          />
          <Input
            type="tel"
            placeholder="Phone"
            value={formData.contact_info.phone}
            onChange={(e) => handleContactInfoChange(e, "phone")}
          />
          <Input
            type="url"
            placeholder="Website"
            value={formData.contact_info.website}
            onChange={(e) => handleContactInfoChange(e, "website")}
          />
          <Input
            type="url"
            placeholder="Twitter"
            value={formData.contact_info.social?.twitter}
            onChange={(e) => handleContactInfoChange(e, "social", "twitter")}
          />
          <Input
            type="url"
            placeholder="LinkedIn"
            value={formData.contact_info.social?.linkedin}
            onChange={(e) => handleContactInfoChange(e, "social", "linkedin")}
          />
          <Input
            type="url"
            placeholder="Discord"
            value={formData.contact_info.social?.discord}
            onChange={(e) => handleContactInfoChange(e, "social", "discord")}
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Link</label>
        <Input
          type="url"
          name="link"
          value={formData.link || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-end">
        <Button
          text={
            isLoading
              ? "Saving..."
              : isEditing
              ? "Update Hackathon"
              : "Create Hackathon"
          }
        />
      </div>
    </form>
  );
};

export default HackathonForm;
