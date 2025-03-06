"use client";

import { useParams } from "next/navigation";
import DashboardHeader from "../../components/dashboard-header";
import HackathonForm from "../components/HackathonForm";

const EditHackathonPage = () => {
  const params = useParams();
  const hackathonId = params.id as string;

  return (
    <main className="min-h-screen bg-zinc-800">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Edit Hackathon</h1>
        <HackathonForm hackathonId={hackathonId} isEditing={true} />
      </div>
    </main>
  );
};

export default EditHackathonPage;
