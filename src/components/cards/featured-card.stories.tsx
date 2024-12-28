import type { Meta, StoryObj } from "@storybook/react";
import FeaturedCard from "./featured-card";

const meta: Meta<typeof FeaturedCard> = {
  title: "Cards/FeaturedCard",
  component: FeaturedCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeaturedCard>;

export const Default: Story = {
  args: {
    image: "https://picsum.photos/800/400",
    title: "Featured Project",
    description:
      "This is a sample featured project with a detailed description that showcases the card component.",
    deadline: "Due: Dec 31, 2024",
  },
};

export const LongContent: Story = {
  args: {
    image: "https://picsum.photos/800/400",
    title:
      "A Very Long Featured Project Title That Might Wrap to Multiple Lines",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    deadline: "Deadline: January 1, 2025",
  },
};
