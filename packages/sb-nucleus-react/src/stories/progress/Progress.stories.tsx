import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusProgress } from "nucleus-react";

NucleusProgress.displayName = "NucleusProgress";

const meta = {
  title: "ATOMS/Progress",
  tags: ["autodocs"],
  component: NucleusProgress,
  args: {
    value: 40,
    max: 100,
    variant: "primary",
    size: "md",
    indeterminate: false,
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    indeterminate: { control: "radio", options: [true, false] },
    value: { control: { type: "number", min: 0 } },
    max: { control: { type: "number", min: 1 } },
  },
} satisfies Meta<typeof NucleusProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};
