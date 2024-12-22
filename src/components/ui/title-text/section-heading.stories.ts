import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeading } from "./section-heading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/Text/Section Heading",
  component: SectionHeading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    text: "Sample Section Heading",
  },
};

export const WithCustomClass: Story = {
  args: {
    text: "Custom Styled Heading",
    className: "text-primary",
  },
};
