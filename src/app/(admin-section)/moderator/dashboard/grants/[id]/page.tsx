"use client";

import { useParams } from "next/navigation";
import DashboardHeader from "../../components/dashboard-header";
import GrantForm from "../components/GrantForm";

const EditGrantPage = () => {
  const params = useParams();
  const grantId = params.id as string;

  return (
    <main className="min-h-screen bg-zinc-800">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Edit Grant</h1>
        <GrantForm grantId={grantId} isEditing={true} />
      </div>
    </main>
  );
};

export default EditGrantPage;
