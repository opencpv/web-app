import type { Meta, StoryObj } from "@storybook/react";
import HackathonCard from "./hackathon-card";
const meta: Meta<typeof HackathonCard> = {
  title: "Cards/HackathonCard",
  component: HackathonCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HackathonCard>;

const sampleHackathon = {
  id: "1",
  title: "AI Innovation Hackathon 2024",
  summary:
    "Join us for an exciting 48-hour hackathon focused on building innovative AI solutions. Work with cutting-edge technologies, learn from industry experts, and compete for amazing prizes!",
  description:
    "Join us for an exciting 48-hour hackathon focused on building innovative AI solutions. Work with cutting-edge technologies, learn from industry experts, and compete for amazing prizes!",
  prizePool: "$20,000",
  deadline: "April 15, 2024",
  organizer: "TechCorp",
  mode: "Virtual" as const,
  category: "ai-ml",
  requirements: ["GitHub account", "Video submission"],
  image: "https://picsum.photos/seed/hack1/1920/1080",
  teamSize: "2-4 members",
  duration: "48 hours",
  schedule: [
    { date: "Apr 15, 2024", event: "Registration Deadline" },
    { date: "Apr 20, 2024", event: "Opening Ceremony" },
    { date: "Apr 20-22, 2024", event: "Hacking Period" },
    { date: "Apr 22, 2024", event: "Project Submissions" },
    { date: "Apr 23, 2024", event: "Judging & Awards" },
  ],
  prizes: [
    {
      place: "1st Place",
      amount: "$10,000",
      description: "Plus cloud credits and mentorship opportunities",
    },
    {
      place: "2nd Place",
      amount: "$6,000",
      description: "Plus premium subscriptions to dev tools",
    },
    {
      place: "3rd Place",
      amount: "$4,000",
      description: "Plus swag packages",
    },
  ],
  rules: [
    "All code must be written during the hackathon",
    "Teams must consist of 2-4 members",
    "Use of open-source libraries is allowed",
    "Projects must be original work",
    "Submissions must include source code and demo video",
    "Teams must present their projects to judges",
  ],
  resources: [
    {
      title: "Starter Templates & Documentation",
      link: "https://example.com/resources",
    },
    {
      title: "Dataset Access",
      link: "https://example.com/datasets",
    },
    {
      title: "API Documentation",
      link: "https://example.com/api-docs",
    },
  ],
  contactInfo: {
    email: "hackathon@techcorp.com",
    discord: "discord.gg/techcorp-hack",
    website: "https://example.com/hackathon",
  },
  registerLink: "https://example.com/register",
};

export const GridView: Story = {
  args: {
    hackathon: sampleHackathon,
    viewMode: "grid",
  },
};

export const ListView: Story = {
  args: {
    hackathon: sampleHackathon,
    viewMode: "list",
  },
  parameters: {
    layout: "padded",
  },
};
