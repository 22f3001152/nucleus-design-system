import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Pill",
  tags: ["autodocs"],
  args: {
    type: "primary",
    shape: "rounded",
    removable: true,
    closed: false,
    label: "Nucleus Pill",
  },
  argTypes: {
    type: { control: "select", options: ["primary", "secondary"] },
    shape: { control: "select", options: ["rounded", "rectangle"] },
    removable: { control: "radio", options: [true, false] },
    closed: { control: "radio", options: [true, false] },
    label: { control: "text" },
  } as any,
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: {
      ...args,
      onPillClose: () => console.log("pillClose"),
    },
    template: `
      <nucleus-pill
        [type]="type"
        [shape]="shape"
        [removable]="removable"
        [closed]="closed"
        (pillClose)="onPillClose()"
      >{{label}}</nucleus-pill>
    `,
  }),
};

export const Rectangle: StoryObj = {
  args: {
    shape: "rectangle",
    label: "Rectangle Pill",
  },
};

export const Secondary: StoryObj = {
  args: {
    type: "secondary",
    label: "Secondary Pill",
  },
};
