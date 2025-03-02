export interface Hackathon {
  id: string;
  title: string;
  summary: string;
  description: string;
  prizePool: string;
  deadline: string;
  organizer: string;
  mode: "In-Person" | "Virtual" | "Hybrid";
  location?: string;
  category: string;
  requirements: string[];
  image: string;
  teamSize: string;
  duration: string;
  // Additional fields for detailed view
  schedule: {
    date: string;
    event: string;
  }[];
  prizes: {
    place: string;
    amount: string;
    description: string;
  }[];
  rules: string[];
  resources: {
    title: string;
    link: string;
  }[];
  contactInfo: {
    email: string;
    discord?: string;
    website: string;
  };
  registerLink: string;
}

export interface AdPlacement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  sponsor: string;
  adType?: "inline" | "sidebar";
}
