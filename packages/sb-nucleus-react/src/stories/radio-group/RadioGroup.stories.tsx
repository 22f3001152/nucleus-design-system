import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusRadio, NucleusRadioGroup } from "nucleus-react";

NucleusRadioGroup.displayName = "NucleusRadioGroup";
NucleusRadio.displayName = "NucleusRadio";

const meta = {
  title: "ATOMS/Radio Group",
  tags: ["autodocs"],
  component: NucleusRadioGroup,
  args: {
    value: "a",
    name: "group-a",
  },
} satisfies Meta<typeof NucleusRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <NucleusRadioGroup value={args.value || "a"} name={args.name || "group-a"}>
      <NucleusRadio value="a" name={args.name || "group-a"} checked>
        Option A
      </NucleusRadio>
      <NucleusRadio value="b" name={args.name || "group-a"}>
        Option B
      </NucleusRadio>
    </NucleusRadioGroup>
  ),
};
