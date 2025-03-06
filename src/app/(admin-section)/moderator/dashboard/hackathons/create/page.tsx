"use client";

import DashboardHeader from "../../components/dashboard-header";
import HackathonForm from "../components/HackathonForm";

const CreateHackathonPage = () => {
  return (
    <main className="min-h-screen bg-zinc-800">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Create Hackathon</h1>
        <HackathonForm />
      </div>
    </main>
  );
};

export default CreateHackathonPage;
