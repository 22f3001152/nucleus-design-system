import { Meta, StoryObj } from "@storybook/angular";
import { buttonArgsType } from "./button.args";

const meta: Meta = {
  title: "ATOMS/Button",
  tags: ["autodocs"],
  argTypes: buttonArgsType as any,
  args: {
    label: "primary button",
    type: "primary",
    size: "md",
    disabled: false,
    rounded: false,
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ["mode"],
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
    <nucleus-button key="primary-example" 
      [type]="type"
      [disabled]="disabled"
      [rounded]="rounded"
      [size]="size">{{label}} </nucleus-button>
    `,
  }),
  name: "Primary",
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    ...buttonArgsType,
  } as any,
};

export const buttonTypes: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
    <nucleus-button type='primary'>button</nucleus-button>
    <nucleus-button type='secondary'>button</nucleus-button>
    `,
  }),
  name: "Button Types",
  parameters: {
    docs: {
      description: {
        story: ``
      }
    }
  }
};
