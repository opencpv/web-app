import { greatVibes } from "@/app/fonts/font";
import CreateCategoryDialog from "@/components/category/create-category-dialog";
import Button from "@/components/ui/button/Button";
import Loader from "@/components/ui/loader";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashboardHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/moderator");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <header
      className={`container mx-auto pt-10 px-10 ${greatVibes.className} text-xl mb-6 text-white`}
    >
      <h1 className="text-white text-2xl font-bold text-center">
        Moderator Dashboard
      </h1>
      <div className="flex justify-center items-center gap-2">
        <button
          className="bg-gray-500 text-white flex items-center gap-2 h-[52px] p-2 rounded-md hover:bg-gray-600 transition-colors"
          onClick={() => router.push("../")}
        >
          <ArrowLeftCircle className="w-4 h-4" />
          Back
        </button>
        <CreateCategoryDialog />
        {isLoading ? (
          <div className="h-12 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <Button text="Logout" onClick={handleLogout} />
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
