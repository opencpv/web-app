"use client";
import { useState } from "react";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

export default function AdminCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
        {mode === "list" ? (
          <button
            onClick={() => setMode("create")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Create New Category
          </button>
        ) : (
          <button
            onClick={() => {
              setMode("list");
              setSelectedCategory(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to List
          </button>
        )}
      </div>

      {/* Main Content */}
      {mode === "list" ? (
        <CategoryList
          onEdit={(id) => {
            setSelectedCategory(id);
            setMode("edit");
          }}
        />
      ) : (
        <CategoryForm
          mode={mode}
          categoryId={selectedCategory}
          onSuccess={() => {
            setMode("list");
            setSelectedCategory(null);
          }}
        />
      )}
    </>
  );
}
