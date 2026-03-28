import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusInput } from "nucleus-react";

NucleusInput.displayName = "NucleusInput";

const meta = {
  title: "ATOMS/Input",
  tags: ["autodocs"],
  component: NucleusInput,
  args: {
    type: "text",
    placeholder: "Enter text",
    variant: "primary",
    size: "md",
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    value: "",
  },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "search"] },
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    disabled: { control: "radio", options: [true, false] },
    readonly: { control: "radio", options: [true, false] },
    required: { control: "radio", options: [true, false] },
    invalid: { control: "radio", options: [true, false] },
  },
} satisfies Meta<typeof NucleusInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
