import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Progress",
  tags: ["autodocs"],
  args: {
    value: 40,
    max: 100,
    variant: "primary",
    size: "md",
    indeterminate: false,
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    indeterminate: { control: "radio", options: [true, false] },
    value: { control: { type: "number", min: 0 } },
    max: { control: { type: "number", min: 1 } },
  } as any,
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
      <nucleus-progress
        [value]="value"
        [max]="max"
        [variant]="variant"
        [size]="size"
        [indeterminate]="indeterminate"
      />
    `,
  }),
};

export const Indeterminate: StoryObj = {
  args: {
    indeterminate: true,
  },
};
