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
  title: "AI Innovation Challenge",
  description:
    "Build the next generation of AI-powered applications that solve real-world problems.",
  image: "https://picsum.photos/800/400",
  prizePool: "$50,000",
  deadline: "March 31, 2024",
  organizer: "Tech Corp",
  teamSize: "2-4 members",
  duration: "48 hours",
  mode: "Hybrid" as "Hybrid" | "In-Person" | "Virtual",
  category: "AI",
  requirements: ["Must have a team of 2-4 members"],
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
