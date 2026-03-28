import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusDropdown } from "nucleus-react";

NucleusDropdown.displayName = "NucleusDropdown";

const meta = {
  title: "ATOMS/Dropdown",
  tags: ["autodocs"],
  component: NucleusDropdown,
  args: {
    label: "User",
    items: ["Profile", "Logout"],
    open: false,
  },
  argTypes: {
    label: { control: "text" },
    items: { control: "object" },
    open: { control: "radio", options: [true, false] },
  },
} satisfies Meta<typeof NucleusDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div style={{ minHeight: "220px", display: "grid", placeItems: "center", paddingTop: "24px" }}>
      <NucleusDropdown
        label={args.label || "User"}
        items={args.items || ["Profile", "Logout"]}
        open={args.open ?? false}
        onItemSelect={(event) => console.log("itemSelect", event.detail)}
        onDropdownToggle={(event) => console.log("dropdownToggle", event.detail)}
      />
    </div>
  ),
};
