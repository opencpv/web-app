"use client";
import { useState } from "react";
import TagList from "./components/TagList";
import TagForm from "./components/TagForm";

export default function AdminTagsPage() {
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Tags</h1>
        {mode === "list" ? (
          <button
            onClick={() => setMode("create")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Create New Tag
          </button>
        ) : (
          <button
            onClick={() => {
              setMode("list");
              setSelectedTag(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to List
          </button>
        )}
      </div>

      {/* Main Content */}
      {mode === "list" ? (
        <TagList
          onEdit={(id) => {
            setSelectedTag(id);
            setMode("edit");
          }}
        />
      ) : (
        <TagForm
          mode={mode}
          tagId={selectedTag}
          onSuccess={() => {
            setMode("list");
            setSelectedTag(null);
          }}
        />
      )}
    </>
  );
}
