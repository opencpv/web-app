"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import CreateCategoryDialog from "@/components/category/create-category-dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button/Button";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching categories");
      return;
    }

    setCategories(data || []);
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("categories")
        .update({
          name: editName.trim(),
          description: editDescription.trim(),
        })
        .eq("id", editingCategory.id);

      if (error) throw error;

      toast.success("Category updated successfully");
      setEditDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (category: Category) => {
    try {
      const { error } = await supabase
        .from("categories")
        .update({ is_active: !category.is_active })
        .eq("id", category.id);

      if (error) throw error;

      toast.success(`Category ${category.is_active ? "disabled" : "enabled"}`);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description || "");
    setEditDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-zinc-800 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <CreateCategoryDialog />
        </div>

        <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="text-white">{category.name}</TableCell>
                  <TableCell className="text-white">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-white">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        category.is_active
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {category.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-white">
                    <div className="flex justify-end gap-2">
                      <Button
                        text="Edit"
                        onClick={() => openEditDialog(category)}
                        variant="outline"
                        color="primary"
                      />
                      <Button
                        text={category.is_active ? "Disable" : "Enable"}
                        onClick={() => handleToggleStatus(category)}
                        variant="outline"
                        color="red"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the category details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Category Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-white"
              />
            </div>
            <div className="grid gap-2">
              <Input
                placeholder="Description (optional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="text-white"
              />
            </div>
          </div>
          <DialogFooter>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : (
              <Button
                text="Save Changes"
                onClick={handleEditCategory}
                variant="solid"
                color="primary"
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CategoriesPage;
