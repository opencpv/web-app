import type { Meta, StoryObj } from "@storybook/react";
import ButtonComponent from "./Button";

const meta: Meta<typeof ButtonComponent> = {
  title: "UI/Button",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

// Base story
export const Primary: Story = {
  args: {
    text: "Button",
    color: "primary",
    width: "md",
    height: "md",
    variant: "solid",
    onClick: () => console.log("Button clicked"),
  },
};

// Size variations
export const Small: Story = {
  args: {
    ...Primary.args,
    width: "sm",
    height: "sm",
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    width: "lg",
    height: "lg",
  },
};

// Variant variations
export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    ...Primary.args,
    variant: "ghost",
  },
};

// Full width example
export const FullWidth: Story = {
  args: {
    ...Primary.args,
    width: "full",
  },
};
