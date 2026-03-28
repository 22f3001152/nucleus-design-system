import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusFooter } from "nucleus-react";

NucleusFooter.displayName = "NucleusFooter";

const meta = {
  title: "MOLECULES/Footer",
  tags: ["autodocs"],
  component: NucleusFooter,
  args: {
    copyright: "© Nucleus Design System",
  },
} satisfies Meta<typeof NucleusFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <NucleusFooter copyright={args.copyright || "© Nucleus Design System"}>
      <a slot="links" href="#">Privacy</a>
      <a slot="links" href="#">Terms</a>
    </NucleusFooter>
  ),
};
