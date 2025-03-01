import { Database } from "../../../../../database.types";

export type HackathonFormData = {
  basicInfo: {
    title: string;
    description: string;
    organizer: string;
    mode: Database["public"]["Enums"]["hackathon_mode"];
    deadline: string;
    duration: string;
    teamSize: string;
    prizePool: string;
    imageUrl: string;
    categoryId: number;
    isActive: boolean;
  };
  contactInfo: {
    email: string;
    discord: string;
    website: string;
  };
  prizes: Array<{
    place: string;
    amount: string;
    description: string;
  }>;
  requirements: string[];
  rules: string[];
  resources: Array<{
    title: string;
    link: string;
  }>;
  schedule: Array<{
    eventName: string;
    eventDate: string;
  }>;
  tags: number[];
};

export type FormStep =
  | "basicInfo"
  | "contactInfo"
  | "prizes"
  | "requirements"
  | "rules"
  | "resources"
  | "schedule"
  | "tags";
