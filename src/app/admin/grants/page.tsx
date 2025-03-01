"use client";
import { useState } from "react";
import GrantForm from "./components/GrantForm";
import GrantList from "./components/GrantList";

export default function AdminGrantsPage() {
  const [selectedGrant, setSelectedGrant] = useState<string | null>(null);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Grants</h1>
        {mode === "list" ? (
          <button
            onClick={() => setMode("create")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Create New Grant
          </button>
        ) : (
          <button
            onClick={() => {
              setMode("list");
              setSelectedGrant(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to List
          </button>
        )}
      </div>

      {mode === "list" ? (
        <GrantList
          onEdit={(id) => {
            setSelectedGrant(id);
            setMode("edit");
          }}
        />
      ) : (
        <GrantForm
          mode={mode}
          grantId={selectedGrant}
          onSuccess={() => {
            setMode("list");
            setSelectedGrant(null);
          }}
        />
      )}
    </>
  );
}
