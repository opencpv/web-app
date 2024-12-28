export interface Hackathon {
  id: string;
  title: string;
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
}
