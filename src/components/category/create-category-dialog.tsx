"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/ui/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function CreateCategoryDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const supabase = createClient();

  const handleCreateCategory = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: name.trim(), description: description.trim() }])
        .select();

      if (error) throw error;

      toast.success("Category created successfully");
      setName("");
      setDescription("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonComponent
          text="📁 Create Category"
          variant="solid"
          color="tertiary"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new category to organize opportunities.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-slate-900"
            />
          </div>
          <div className="grid gap-2">
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-slate-900"
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <ButtonComponent
              text="Create"
              onClick={handleCreateCategory}
              variant="solid"
              color="primary"
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
