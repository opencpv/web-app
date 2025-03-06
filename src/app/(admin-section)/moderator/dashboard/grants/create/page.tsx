"use client";

import DashboardHeader from "../../components/dashboard-header";
import GrantForm from "../components/GrantForm";

const CreateGrantPage = () => {
  return (
    <main className="min-h-screen bg-zinc-800">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Create Grant</h1>
        <GrantForm />
      </div>
    </main>
  );
};

export default CreateGrantPage;
