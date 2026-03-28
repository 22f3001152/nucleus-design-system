import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusAvatar } from "nucleus-react";

NucleusAvatar.displayName = "NucleusAvatar";

const meta = {
  title: "ATOMS/Avatar",
  tags: ["autodocs"],
  component: NucleusAvatar,
  args: {
    name: "Nucleus User",
    alt: "Nucleus Avatar",
    shape: "circle",
    size: "md",
    type: "primary",
    src: "",
  },
  argTypes: {
    shape: { control: "select", options: ["circle", "square"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    type: { control: "select", options: ["primary", "secondary"] },
    src: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component: "Avatar atom with Ant-inspired initials fallback, image support, and shape/size variants.",
      },
    },
  },
} satisfies Meta<typeof NucleusAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <NucleusAvatar
      name={args.name || "Nucleus User"}
      alt={args.alt || "Nucleus Avatar"}
      shape={args.shape || "circle"}
      size={args.size || "md"}
      type={args.type || "primary"}
      src={args.src || ""}
    />
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/120?img=5",
    name: "",
  },
};
