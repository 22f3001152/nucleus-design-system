import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "MOLECULES/Multiselect Dropdown",
  tags: ["autodocs"],
  args: {
    options: ["React", "Angular", "Vue", "Svelte"],
    value: ["React"],
    placeholder: "Select frameworks",
  },
  argTypes: {
    options: { control: "object", description: "List of options available for selection." },
    value: { control: "object", description: "Currently selected values." },
    placeholder: { control: "text", description: "Placeholder shown when nothing is selected." },
  } as any,
  parameters: {
    docs: {
      description: {
        component:
          "A molecule-level multiselect dropdown inspired by react-select patterns. Selected items are rendered as removable `nucleus-pill` tags and the component emits `valueChange` on updates.",
      },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: {
      ...args,
      onValueChange: (event: CustomEvent<string[]>) => console.log("valueChange", event.detail),
    },
    template: `
      <div style="max-width:420px;">
        <nucleus-multiselect
          [options]="options"
          [value]="value"
          [placeholder]="placeholder"
          (valueChange)="onValueChange($event)"
        ></nucleus-multiselect>
      </div>
    `,
  }),
};

export const PreselectedMany: StoryObj = {
  args: {
    value: ["React", "Angular"],
  },
};
