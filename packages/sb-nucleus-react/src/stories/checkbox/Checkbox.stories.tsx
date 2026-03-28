import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusCheckbox } from "nucleus-react";

NucleusCheckbox.displayName = "NucleusCheckbox";

const meta = {
  title: "ATOMS/Checkbox",
  tags: ["autodocs"],
  component: NucleusCheckbox,
  args: {
    checked: false,
    disabled: false,
    required: false,
    variant: "primary",
    size: "md",
    children: "Accept terms",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    checked: { control: "radio", options: [true, false] },
    disabled: { control: "radio", options: [true, false] },
    required: { control: "radio", options: [true, false] },
  },
} satisfies Meta<typeof NucleusCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
