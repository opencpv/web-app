"use client";
import { useState } from "react";
import { HackathonMode } from "@/lib/types";
import HackathonList from "./components/HackathonList";
import HackathonForm from "./components/HackathonForm";

export default function AdminHackathonsPage() {
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(
    null
  );
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Hackathons</h1>
        {mode === "list" ? (
          <button
            onClick={() => setMode("create")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Create New Hackathon
          </button>
        ) : (
          <button
            onClick={() => {
              setMode("list");
              setSelectedHackathon(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to List
          </button>
        )}
      </div>

      {mode === "list" ? (
        <HackathonList
          onEdit={(id) => {
            setSelectedHackathon(id);
            setMode("edit");
          }}
        />
      ) : (
        <HackathonForm
          mode={mode}
          hackathonId={selectedHackathon}
          onSuccess={() => {
            setMode("list");
            setSelectedHackathon(null);
          }}
        />
      )}
    </>
  );
}
