import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusHeader } from "nucleus-react";

NucleusHeader.displayName = "NucleusHeader";

const meta = {
  title: "MOLECULES/Header",
  tags: ["autodocs"],
  component: NucleusHeader,
  args: {
    brand: "Nucleus",
    menuOpen: false,
  },
} satisfies Meta<typeof NucleusHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <NucleusHeader
      brand={args.brand || "Nucleus"}
      menuOpen={args.menuOpen || false}
      onMenuToggle={(event) => console.log("menuToggle", event.detail)}
      onMenuClose={() => console.log("menuClose")}
    >
      <span slot="brand">{args.brand || "Nucleus"}</span>
      <a slot="nav" href="#">Home</a>
      <a slot="nav" href="#">Docs</a>
      <a slot="nav" href="#">Contact</a>
    </NucleusHeader>
  ),
};
