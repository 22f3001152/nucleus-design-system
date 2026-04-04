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
  render: (args: any) => {
    const props = {
      name: args.name ?? "Nucleus User",
      alt: args.alt ?? "Nucleus Avatar",
      shape: args.shape ?? "circle",
      size: args.size ?? "md",
      type: args.type ?? "primary",
      src: args.src ?? "",
    };

    return {
      props,
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
    };
  },
  parameters: {
    docs: {
      description: {
        component: "Avatar atom with initials fallback, image support, and shape/size variants.",
      },
    },
  },
};

export default meta;

export const Primary: StoryObj = {};

export const WithImage: StoryObj = {
  args: {
    src: "https://i.pravatar.cc/120?img=5",
    name: "",
  },
};
