"use client";
import { useEffect, useState } from "react";
import { HackathonDetailed, HackathonMode } from "@/lib/types";
import DynamicArray from "@/components/form/DynamicArray";
import { toast } from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePickerDemo } from "@/components/ui/datepicker";

interface Props {
  mode: "create" | "edit";
  hackathonId: string | null;
  onSuccess: () => void;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const initialFormData: Partial<HackathonDetailed> = {
  title: "",
  description: "",
  summary: "",
  prize_pool: "",
  deadline: "",
  organizer: "",
  mode: "VIRTUAL",
  requirements: [],
  image_url: "",
  banner: "",
  team_size: "",
  duration: "",
  schedule: [],
  prizes: [],
  rules: [],
  resources: [],
  link: "",
  contact_info: {
    email: "",
    website: "",
    discord: "",
  },
  category: "",
  hackathon_tags: [],
};
const supabase = createClient();
export default function HackathonForm({ mode, hackathonId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =
    useState<Partial<HackathonDetailed>>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData.image_url) {
      setImagePreview(formData.image_url);
    } else {
      setImagePreview(null);
    }
  }, [imageFile, formData.image_url]);

  useEffect(() => {
    if (bannerFile) {
      const objectUrl = URL.createObjectURL(bannerFile);
      setBannerPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData.banner) {
      setBannerPreview(formData.banner);
    } else {
      setBannerPreview(null);
    }
  }, [bannerFile, formData.banner]);

  useEffect(() => {
    if (mode === "edit" && hackathonId) {
      fetchHackathon();
    }
  }, [hackathonId]);
\
  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  async function fetchHackathon() {
    const { data, error } = await supabase
      .from("hackathons")
      .select(
        `
        *,
        hackathon_tags (
          tag
        )
      `
      )
      .eq("id", hackathonId)
      .single();

    if (error) {
      toast.error("Error fetching hackathon");
      return;
    }

    // Extract tag IDs from the hackathon_tags relation
    const tagIds =
      data.hackathon_tags?.map((ht: { tag: number }) => ht.tag) || [];
    setSelectedTags(tagIds);

    // Remove hackathon_tags from the data before setting formData
    const { ...hackathonData } = data;
    setFormData(hackathonData);
  }

  async function uploadFile(
    file: File,
    folder: string = "images"
  ): Promise<string | null> {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Error uploading ${folder} file`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(folder).getPublicUrl(filePath);

    return publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.team_size || !formData.duration) {
      toast.error("Team size and duration are required");
      setLoading(false);
      return;
    }

    try {
      // Handle file uploads first, concurrently
      const uploadPromises = [];
      const updatedFields: Record<string, unknown> = {};

      if (imageFile) {
        uploadPromises.push(
          uploadFile(imageFile, "images").then((url) => {
            if (url) updatedFields.image_url = url;
          })
        );
      }

      if (bannerFile) {
        uploadPromises.push(
          uploadFile(bannerFile, "images").then((url) => {
            if (url) updatedFields.banner = url;
          })
        );
      }

      // Wait for all uploads to complete
      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }

      let hackathon;

      if (mode === "create") {
        const dataToSave = {
          ...formData,
          ...updatedFields,
          deadline: formData.deadline || null,
          resources: formData.resources || [],
          hackathon_tags: selectedTags,
        };

        const { data, error: insertError } = await supabase
          .from("hackathons")
          .insert([dataToSave])
          .select()
          .single();

        if (insertError) throw insertError;
        hackathon = data;
      } else {
        // For edit mode, only update changed fields
        const changedFields: Record<string, unknown> = {};

        // Include uploaded image URLs only if they were changed
        if (imageFile) {
          changedFields.image_url = updatedFields.image_url;
        }
        if (bannerFile) {
          changedFields.banner = updatedFields.banner;
        }

        // Compare other fields with initial data
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "image_url" && key !== "banner") {
            const initialValue =
              initialFormData[key as keyof typeof initialFormData];
            if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
              changedFields[key] = value;
            }
          }
        });

        // Only proceed with update if there are changes
        if (Object.keys(changedFields).length > 0) {
          const { data, error: updateError } = await supabase
            .from("hackathons")
            .update(changedFields)
            .eq("id", hackathonId)
            .select()
            .single();

          if (updateError) throw updateError;
          hackathon = data;
        }
      }

      // Handle tags if we have a hackathon and selected tags
      if (hackathon && selectedTags.length > 0) {
        if (mode === "edit") {
          await supabase
            .from("hackathon_tags")
            .delete()
            .eq("hackathon", hackathonId);
        }

        const tagData = selectedTags.map((tagId) => ({
          hackathon: hackathon.id,
          tag: tagId,
        }));

        const { error: tagError } = await supabase
          .from("hackathon_tags")
          .upsert(tagData);

        if (tagError) throw tagError;
      }

      toast.success(
        mode === "create" ? "Hackathon created!" : "Hackathon updated!"
      );
      onSuccess();
    } catch (error) {
      console.error("Error saving hackathon:", error);
      toast.error(
        error instanceof Error ? error.message : "Error saving hackathon"
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true);

    if (error) {
      toast.error("Error fetching categories");
      return;
    }
    setCategories(data);
  }

  async function fetchTags() {
    const { data, error } = await supabase.from("tags").select("*");
    if (error) {
      toast.error("Error fetching tags");
      return;
    }
    setTags(data);
  }

  async function createTag(name: string) {
    const { data, error } = await supabase
      .from("tags")
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      toast.error("Error creating tag");
      return null;
    }
    setTags([...tags, data]);
    return data.id;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 container mx-auto bg-white rounded-xl shadow-lg p-8"
    >
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Basic Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="mt-1"
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Prize Pool</Label>
            <Input
              type="text"
              value={formData.prize_pool}
              onChange={(e) =>
                setFormData({ ...formData, prize_pool: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label className="block text-sm mb-1">Deadline</Label>
            <DatePickerDemo
              date={
                formData.deadline ? new Date(formData.deadline) : new Date()
              }
              setDate={(date) =>
                setFormData({
                  ...formData,
                  deadline: date.toISOString(),
                })
              }
              defaultDate={formData.deadline}
            />
          </div>
          <div>
            <Label className="text-sm mb-1- block">Organizer</Label>
            <Input
              type="text"
              value={formData.organizer}
              onChange={(e) =>
                setFormData({ ...formData, organizer: e.target.value })
              }
              className=""
              required
            />
          </div>

          <div>
            <Label className="text-sm block">Mode</Label>
            <Select
              value={formData.mode}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  mode: value as HackathonMode,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIRTUAL">Virtual</SelectItem>
                <SelectItem value="IN_PERSON">In Person</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Link</Label>
            <Input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              placeholder="Hackathon registration link"
              required
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-yellow-50 file:text-yellow-700
            hover:file:bg-yellow-100"
          />
          {imagePreview && (
            <div className="relative mt-4">
              <img
                src={imagePreview}
                alt="Cover Preview"
                className="h-40 w-full object-cover rounded-lg shadow-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  setFormData({ ...formData, image_url: "" });
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-yellow-50 file:text-yellow-700
            hover:file:bg-yellow-100"
          />
          {bannerPreview && (
            <div className="relative mt-4">
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="h-40 w-full object-cover rounded-lg shadow-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setBannerFile(null);
                  setBannerPreview(null);
                  setFormData({ ...formData, banner: "" });
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <DynamicArray
          items={formData.requirements || []}
          onChange={(items) =>
            setFormData({ ...formData, requirements: items })
          }
          label="Requirements"
          placeholder="Add a requirement"
        />

        <DynamicArray
          items={formData.rules || []}
          onChange={(items) => setFormData({ ...formData, rules: items })}
          label="Rules"
          placeholder="Add a rule"
        />
      </div>

      {/* Schedule */}
      <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
        <label className="block text-lg font-semibold text-gray-800">
          Schedule
        </label>
        {(formData.schedule || []).map((item, index) => (
          <div key={index} className="flex gap-2">
            <div className="w-1/3">
              <DatePickerDemo
                date={item.date ? new Date(item.date) : new Date()}
                setDate={(date) => {
                  const newSchedule = [...(formData.schedule || [])];
                  newSchedule[index] = { ...item, date: date.toISOString() };
                  setFormData({ ...formData, schedule: newSchedule });
                }}
                defaultDate={item.date}
              />
            </div>
            <Input
              type="text"
              value={item.event}
              onChange={(e) => {
                const newSchedule = [...(formData.schedule || [])];
                newSchedule[index] = { ...item, event: e.target.value };
                setFormData({ ...formData, schedule: newSchedule });
              }}
              placeholder="Event description"
              className="flex-1"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const newSchedule = formData.schedule?.filter(
                  (_, i) => i !== index
                );
                setFormData({ ...formData, schedule: newSchedule });
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const newSchedule = [
              ...(formData.schedule || []),
              { date: new Date().toISOString(), event: "" },
            ];
            setFormData({ ...formData, schedule: newSchedule });
          }}
          className="text-yellow-700 hover:text-yellow-900"
        >
          <span className="mr-1">+</span> Add Schedule Item
        </Button>
      </div>

      {/* Prizes Section */}
      <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
        <label className="block text-lg font-semibold text-gray-800">
          Prizes
        </label>
        {(formData.prizes || []).map((prize, index) => (
          <div key={index} className="flex gap-2 space-y-2">
            <div className="grid grid-cols-3 gap-2 w-full">
              <Input
                type="text"
                value={prize.place}
                onChange={(e) => {
                  const newPrizes = [...(formData.prizes || [])];
                  newPrizes[index] = { ...prize, place: e.target.value };
                  setFormData({ ...formData, prizes: newPrizes });
                }}
                placeholder="Place (e.g., 1st Place)"
              />
              <Input
                type="text"
                value={prize.amount}
                onChange={(e) => {
                  const newPrizes = [...(formData.prizes || [])];
                  newPrizes[index] = { ...prize, amount: e.target.value };
                  setFormData({ ...formData, prizes: newPrizes });
                }}
                placeholder="Amount (e.g., $10,000)"
              />
              <Input
                type="text"
                value={prize.description}
                onChange={(e) => {
                  const newPrizes = [...(formData.prizes || [])];
                  newPrizes[index] = { ...prize, description: e.target.value };
                  setFormData({ ...formData, prizes: newPrizes });
                }}
                placeholder="Description"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const newPrizes = formData.prizes?.filter(
                  (_, i) => i !== index
                );
                setFormData({ ...formData, prizes: newPrizes });
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const newPrizes = [
              ...(formData.prizes || []),
              { place: "", amount: "", description: "" },
            ];
            setFormData({ ...formData, prizes: newPrizes });
          }}
          className="text-yellow-700 hover:text-yellow-900"
        >
          <span className="mr-1">+</span> Add Prize
        </Button>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Contact Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.contact_info?.email || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_info: {
                    ...(formData.contact_info || {
                      email: "",
                      website: "",
                      discord: "",
                    }),
                    email: e.target.value,
                  },
                })
              }
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="url"
              value={formData.contact_info?.website || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_info: {
                    ...(formData.contact_info || {
                      email: "",
                      website: "",
                      discord: "",
                    }),
                    website: e.target.value,
                  },
                })
              }
              className="mt-1"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Categories and Tags
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Select
              value={formData.category?.toString() || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
              />
              <Button
                type="button"
                onClick={async () => {
                  if (newTag.trim()) {
                    const tagId = await createTag(newTag.trim());
                    if (tagId) {
                      setSelectedTags([...selectedTags, tagId]);
                      setNewTag("");
                    }
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant={
                    selectedTags.includes(tag.id) ? "default" : "outline"
                  }
                  onClick={() => {
                    setSelectedTags(
                      selectedTags.includes(tag.id)
                        ? selectedTags.filter((id) => id !== tag.id)
                        : [...selectedTags, tag.id]
                    );
                  }}
                  className="text-sm"
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add new required fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Team Size</Label>
          <Input
            type="text"
            value={formData.team_size}
            onChange={(e) =>
              setFormData({ ...formData, team_size: e.target.value })
            }
            placeholder="e.g., 2-4 members"
            required
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            type="text"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            placeholder="e.g., 48 hours"
            required
          />
        </div>
      </div>

      <div>
        <Label>Summary</Label>
        <Textarea
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          placeholder="Brief summary of the hackathon"
          className="mt-1"
        />
      </div>

      {/* Resources Section */}
      <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
        <label className="block text-lg font-semibold text-gray-800">
          Resources
        </label>
        {(formData.resources || []).map((resource, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="text"
              value={resource.title}
              onChange={(e) => {
                const newResources = [...(formData.resources || [])];
                newResources[index] = { ...resource, title: e.target.value };
                setFormData({ ...formData, resources: newResources });
              }}
              placeholder="Resource title"
            />
            <Input
              type="url"
              value={resource.link}
              onChange={(e) => {
                const newResources = [...(formData.resources || [])];
                newResources[index] = { ...resource, link: e.target.value };
                setFormData({ ...formData, resources: newResources });
              }}
              placeholder="Resource link"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const newResources = formData.resources?.filter(
                  (_, i) => i !== index
                );
                setFormData({ ...formData, resources: newResources });
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const newResources = [
              ...(formData.resources || []),
              { title: "", link: "" },
            ];
            setFormData({ ...formData, resources: newResources });
          }}
        >
          Add Resource
        </Button>
      </div>

      {/* Submit button */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : mode === "create" ? (
            "Create Hackathon"
          ) : (
            "Update Hackathon"
          )}
        </Button>
      </div>
    </form>
  );
}
