import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Checkbox",
  tags: ["autodocs"],
  args: {
    checked: false,
    disabled: false,
    required: false,
    variant: "primary",
    size: "md",
    label: "Accept terms",
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
      <nucleus-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [variant]="variant"
        [size]="size"
      >{{label}}</nucleus-checkbox>
    `,
  }),
};
