import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Dropdown",
  tags: ["autodocs"],
  args: {
    label: "User",
    items: ["Profile", "Logout"],
    open: false,
  },
  argTypes: {
    label: { control: "text" },
    items: { control: "object" },
    open: { control: "radio", options: [true, false] },
  } as any,
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: {
      ...args,
      onItemSelect: (event: CustomEvent<string>) => console.log("itemSelect", event.detail),
      onDropdownToggle: (event: CustomEvent<boolean>) => console.log("dropdownToggle", event.detail),
    },
    template: `
      <div style="min-height:220px;display:grid;place-items:center;padding-top:24px;">
        <nucleus-dropdown
          [label]="label"
          [items]="items"
          [open]="open"
          (itemSelect)="onItemSelect($event)"
          (dropdownToggle)="onDropdownToggle($event)"
        ></nucleus-dropdown>
      </div>
    `,
  }),
};
