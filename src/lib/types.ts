export type HackathonMode = "VIRTUAL" | "IN_PERSON" | "HYBRID";

export interface HackathonDetailed {
  id: string;
  title: string;
  description: string;
  prize_pool: string;
  deadline: string;
  organizer: string;
  banner: string;
  category: string;
  summary?: string;
  mode: HackathonMode;
  requirements: string[];
  image_url?: string;
  tags: string[];
  team_size: string;
  duration: string;
  link: string;
  schedule: Array<{
    date: string;
    event: string;
  }>;
  prizes: Array<{
    place: string;
    amount: string;
    description: string;
  }>;
  rules: string[];
  resources: Array<{
    title: string;
    link: string;
  }>;
  contact_info: {
    email: string;
    discord?: string;
    website: string;
  };
  hackathon_tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
}
