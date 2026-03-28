import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Radio Group",
  tags: ["autodocs"],
  args: {
    name: "group-a",
    value: "a",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  } as any,
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
      <nucleus-radio-group [name]="name" [value]="value">
        <nucleus-radio [name]="name" value="a" [variant]="variant" [size]="size" checked>Option A</nucleus-radio>
        <nucleus-radio [name]="name" value="b" [variant]="variant" [size]="size">Option B</nucleus-radio>
      </nucleus-radio-group>
    `,
  }),
};
