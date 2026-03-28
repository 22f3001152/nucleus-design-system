import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Radio",
  tags: ["autodocs"],
  args: {
    value: "option-a",
    name: "radio-single",
    checked: false,
    disabled: false,
    required: false,
    variant: "primary",
    size: "md",
    label: "Option A",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    checked: { control: "radio", options: [true, false] },
    disabled: { control: "radio", options: [true, false] },
    required: { control: "radio", options: [true, false] },
    label: { control: "text" },
  } as any,
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
      <nucleus-radio
        [value]="value"
        [name]="name"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [variant]="variant"
        [size]="size"
      >{{label}}</nucleus-radio>
    `,
  }),
};
