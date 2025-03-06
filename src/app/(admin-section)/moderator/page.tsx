"use client";

import { greatVibes } from "@/app/fonts/font";
import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import Loader from "@/components/ui/loader";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signInSchema } from "@/lib/validation-schemas";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ModeratorPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const userValidation = await signInSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      const { data, error } = await supabase.auth.signInWithPassword(
        userValidation
      );
      if (error) {
        throw new Error(error.message);
      }
      toast.success("Login successful");
      // check if user is onboarded
      const { data: userData, error: userError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", data.user.id);
      if (userError) {
        throw new Error(userError.message);
      }
      if (userData.length === 0) {
        router.push(`/moderator/onboarding?userId=${data.user.id}`);
      } else {
        router.push("/moderator/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center relative">
      <div className="container mx-auto px-4 text-center lg:w-1/3">
        <h1 className={`${greatVibes.className} text-xl mb-6 text-white`}>
          Moderator Login
        </h1>
        <div className="flex flex-col gap-2 text-white">
          <Input
            type="email"
            placeholder="Email"
            className="h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <div className="flex justify-center items-center h-12">
              <Loader />
            </div>
          ) : (
            <Button text="Login" onClick={handleSignIn} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center py-4 bg-gradient-to-t from-zinc-800 to-transparent">
        <Logo />
      </div>
    </main>
  );
};

export default ModeratorPage;
