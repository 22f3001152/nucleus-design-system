import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusRadio } from "nucleus-react";

NucleusRadio.displayName = "NucleusRadio";

const meta = {
  title: "ATOMS/Radio",
  tags: ["autodocs"],
  component: NucleusRadio,
  args: {
    value: "option-a",
    name: "radio-single",
    checked: false,
    disabled: false,
    required: false,
    variant: "primary",
    size: "md",
    children: "Option A",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    checked: { control: "radio", options: [true, false] },
    disabled: { control: "radio", options: [true, false] },
    required: { control: "radio", options: [true, false] },
  },
} satisfies Meta<typeof NucleusRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
