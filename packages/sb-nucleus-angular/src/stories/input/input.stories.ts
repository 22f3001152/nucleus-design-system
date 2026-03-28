import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Input",
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Enter text",
    variant: "primary",
    size: "md",
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    value: "",
  },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "search"] },
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    disabled: { control: "radio", options: [true, false] },
    readonly: { control: "radio", options: [true, false] },
    required: { control: "radio", options: [true, false] },
    invalid: { control: "radio", options: [true, false] },
  } as any,
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
      <nucleus-input
        [type]="type"
        [placeholder]="placeholder"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [invalid]="invalid"
        [value]="value"
      />
    `,
  }),
};
