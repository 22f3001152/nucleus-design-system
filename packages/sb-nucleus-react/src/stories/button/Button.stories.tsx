import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusButton } from "nucleus-react";
import { buttonArgsType } from "./Button.args";

NucleusButton.displayName = "NucleusButton";

const meta = {
  title: "ATOMS/Button",
  tags: ["autodocs"],
  component: NucleusButton,
  argTypes: buttonArgsType,
} satisfies Meta<typeof NucleusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    const label = ("label" in args ? args.label : "Primary") as string;
    return (
      <NucleusButton
        key={`${args.type || "primary"}-${args.rounded || false}-${args.disabled || false}-${args.size || "md"}-${label}`}
        type={args.type || "primary"}
        rounded={args.rounded || false}
        disabled={args.disabled || false}
        size={args.size || "md"}
      >
        {label}
      </NucleusButton>
    );
  },
};

export const ButtonTypes: Story = {
};

ButtonTypes.render = () => {
  return (
    <div>
      <NucleusButton type="primary">Call to action</NucleusButton>
      <NucleusButton type="secondary">Outline</NucleusButton>
    </div>
  );
}

ButtonTypes.parameters = {
  docs: {
    source: {
      language: 'html',
      format: true,
      code: `
      <div>
        <NucleusButton type="primary">Call to action</NucleusButton>
        <NucleusButton type="secondary">Outline</NucleusButton>
      </div>
      `
    }
  }
}
