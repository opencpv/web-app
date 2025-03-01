import type { Meta, StoryObj } from "@storybook/react";
import AdBannerCard from "./ad-banner-card";

const meta: Meta<typeof AdBannerCard> = {
  title: "Cards/AdBannerCard",
  component: AdBannerCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdBannerCard>;

export const Default: Story = {
  args: {
    featuredAd: {
      image: "https://picsum.photos/800/600",
      title: "Discover Our New Product Line",
      sponsor: "Example Company",
      description:
        "Experience the next generation of innovation with our latest product line. Limited time offer available now.",
      link: "https://example.com",
    },
  },
};

export const LongContent: Story = {
  args: {
    featuredAd: {
      image: "https://picsum.photos/800/600",
      title:
        "A Very Long Title That Might Wrap to Multiple Lines in the Banner",
      sponsor: "Company with a Long Name Inc.",
      description:
        "This is a much longer description that demonstrates how the banner handles extended content. It includes multiple sentences to show text wrapping and overall layout behavior with larger amounts of content.",
      link: "https://example.com",
    },
  },
};
