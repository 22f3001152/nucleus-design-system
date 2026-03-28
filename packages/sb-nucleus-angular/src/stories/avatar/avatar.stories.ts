import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ATOMS/Avatar",
  tags: ["autodocs"],
  args: {
    name: "Nucleus User",
    alt: "Nucleus Avatar",
    shape: "circle",
    size: "md",
    type: "primary",
    src: "",
  },
  argTypes: {
    shape: { control: "select", options: ["circle", "square"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    type: { control: "select", options: ["primary", "secondary"] },
    src: { control: "text" },
  } as any,
  parameters: {
    docs: {
      description: {
        component: "Avatar atom with initials fallback, image support, and shape/size variants.",
      },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
      <nucleus-avatar
        [name]="name"
        [alt]="alt"
        [shape]="shape"
        [size]="size"
        [type]="type"
        [src]="src"
      ></nucleus-avatar>
    `,
  }),
};

export const WithImage: StoryObj = {
  args: {
    src: "https://i.pravatar.cc/120?img=5",
    name: "",
  },
};
