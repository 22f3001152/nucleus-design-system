import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusPill } from "nucleus-react";

NucleusPill.displayName = "NucleusPill";

const meta = {
  title: "ATOMS/Pill",
  tags: ["autodocs"],
  component: NucleusPill,
  args: {
    type: "primary",
    shape: "rounded",
    removable: true,
    closed: false,
    children: "Nucleus Pill",
  },
  argTypes: {
    type: { control: "select", options: ["primary", "secondary"] },
    shape: { control: "select", options: ["rounded", "rectangle"] },
    removable: { control: "radio", options: [true, false] },
    closed: { control: "radio", options: [true, false] },
  },
} satisfies Meta<typeof NucleusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <NucleusPill
      key={`${args.type || "primary"}-${args.shape || "rounded"}-${String(args.removable)}-${String(args.closed)}-${String(args.children || "Nucleus Pill")}`}
      type={args.type || "primary"}
      shape={args.shape || "rounded"}
      removable={args.removable ?? true}
      closed={args.closed ?? false}
      onPillClose={() => console.log("pillClose")}
    >
      {args.children || "Nucleus Pill"}
    </NucleusPill>
  ),
};

export const Rectangle: Story = {
  args: {
    shape: "rectangle",
    children: "Rectangle Pill",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    children: "Secondary Pill",
  },
};
