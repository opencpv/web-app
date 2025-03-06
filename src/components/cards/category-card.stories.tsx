import type { Meta, StoryObj } from "@storybook/react";
import CategoryCard from "./link-page-card";

const meta: Meta<typeof CategoryCard> = {
  title: "Cards/CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  args: {
    icon: "🎨",
    title: "Art",
    description: "Explore various art categories and styles",
  },
};

export const Technology: Story = {
  args: {
    icon: "💻",
    title: "Technology",
    description: "Discover the latest in tech and innovation",
  },
};

export const Music: Story = {
  args: {
    icon: "🎵",
    title: "Music",
    description: "Browse different music genres and instruments",
  },
};
