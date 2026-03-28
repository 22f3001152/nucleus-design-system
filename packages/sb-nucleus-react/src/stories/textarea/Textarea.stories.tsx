import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusTextarea } from "nucleus-react";

NucleusTextarea.displayName = "NucleusTextarea";

const meta = {
  title: "ATOMS/Textarea",
  tags: ["autodocs"],
  component: NucleusTextarea,
  args: {
    placeholder: "Enter description",
    variant: "primary",
    size: "md",
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    value: "",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    rows: { control: { type: "number", min: 1 } },
    disabled: { control: "radio", options: [true, false] },
    readonly: { control: "radio", options: [true, false] },
    required: { control: "radio", options: [true, false] },
    invalid: { control: "radio", options: [true, false] },
  },
} satisfies Meta<typeof NucleusTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
