"use client";
import { greatVibes } from "@/app/fonts/font";
import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { createClient } from "@/lib/supabase/client";
import { onboardingSchema } from "@/lib/validation-schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const OnboardingPage = () => {
  const countryList = useMemo(() => countries, []);
  const supabase = createClient();
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSearchParams().get("userId");

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const profileData = onboardingSchema.validate({
        firstname,
        lastname,
        country,
        phone,
      });

      const { data, error } = await supabase.from("user_profile").insert({
        user_id: userId,
        ...profileData,
        role: "moderator",
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw new Error(error.message);
      } else {
        toast.success("Profile updated successfully");
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
      <h1 className={`${greatVibes.className} text-xl mb-6 text-white`}>
        Onboarding
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white">
        <Input
          type="text"
          placeholder="Firstname"
          className="h-12"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Lastname"
          className="h-12"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <Select>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="h-[400px]">
            {countryList.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                onClick={() => setCountry(country.name)}
              >
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Phone"
          className="h-12"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="col-span-2 w-full">
          {isLoading ? (
            <div className="h-12 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <Button text="Save" width="full" onClick={handleSave} />
          )}
        </div>
      </div>
    </main>
  );
};

export default OnboardingPage;
