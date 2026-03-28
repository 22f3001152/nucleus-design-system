import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Textarea",
  tags: ["autodocs"],
  args: {
    placeholder: "Enter description",
    variant: "primary",
    size: "md",
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    value: "",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    rows: { control: { type: "number", min: 1 } },
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
      <nucleus-textarea
        [placeholder]="placeholder"
        [variant]="variant"
        [size]="size"
        [rows]="rows"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [invalid]="invalid"
        [value]="value"
      />
    `,
  }),
};
