import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusMultiselect } from "nucleus-react";

NucleusMultiselect.displayName = "NucleusMultiselect";

const meta = {
  title: "MOLECULES/Multiselect Dropdown",
  tags: ["autodocs"],
  component: NucleusMultiselect,
  args: {
    options: ["React", "Angular", "Vue", "Svelte"],
    value: ["React"],
    placeholder: "Select frameworks",
  },
  argTypes: {
    options: { control: "object", description: "List of options available for selection." },
    value: { control: "object", description: "Currently selected values." },
    placeholder: { control: "text", description: "Placeholder shown when nothing is selected." },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A molecule-level multiselect dropdown inspired by react-select patterns. Selected items are rendered as removable `nucleus-pill` tags and the component emits `valueChange` on updates.",
      },
    },
  },
} satisfies Meta<typeof NucleusMultiselect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div style={{ maxWidth: "420px" }}>
      <NucleusMultiselect
        options={args.options || ["React", "Angular"]}
        value={args.value || []}
        placeholder={args.placeholder || "Select frameworks"}
        onValueChange={(event) => console.log("valueChange", event.detail)}
      />
    </div>
  ),
};

export const PreselectedMany: Story = {
  args: {
    value: ["React", "Angular"],
  },
};
