import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusToggle } from "nucleus-react";
import { toggleArgsType } from "./Toggle.args";

NucleusToggle.displayName = "NucleusToggle";

const meta = {
  title: "ATOMS/Toggle",
  tags: ["autodocs"],
  component: NucleusToggle,
  argTypes: toggleArgsType,
  args: {
    type: "primary",
    checked: true,
    disabled: false,
    size: "md",
  },
} satisfies Meta<typeof NucleusToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <NucleusToggle
        type={args.type ?? "primary"}
        checked={args.checked ?? true}
        disabled={args.disabled ?? false}
        size={args.size ?? "md"}
      />
    );
  },
};

export const Secondary: Story = {
};

Secondary.render = () => {
  return <NucleusToggle type="secondary" size="md" checked />
}

Secondary.parameters = {
  docs: {
    description: {
      story: `The Nucleus Toggle component offers two variants that are controlled using the 'type' attribute within the 'NucleusToggle' component. Please refer to the provided code snippet for further details and implementation specifics.`
    },
    source: {
      type: 'tsx',
      format: true,
      code: `<NucleusToggle type="secondary" size="md" checked />`
    }
  }
}

export const Size: Story = {
};

Size.render = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "3em" }}>
      <NucleusToggle size="xs" />
      <NucleusToggle size="sm" />
      <NucleusToggle size="md" />
      <NucleusToggle size="lg" />
      <NucleusToggle size="xl" />
    </div>
  )
};

Size.parameters = {
  docs: {
    description: {
      story: `The Nucleus Toggle component provides various sizes corresponding to different screen resolutions, determined by the 'size' attribute. Valid values for this attribute include 'xs', 'sm', 'md', 'lg', and 'xl'. For more detailed examples, please refer to the provided examples below.`
    },
    source: {
      type: 'tsx',
      format: true,
      code: `
      <div style={{ display: "flex", flexDirection: "row", gap: "3em" }}>
        <NucleusToggle size="xs" />
        <NucleusToggle size="sm" />
        <NucleusToggle size="md" />
        <NucleusToggle size="lg" />
        <NucleusToggle size="xl" />
      </div>
      `
    }
  }
}

export const EventControls: Story = {
};

EventControls.render = () => {
  const recordEventTrigger = (event: any) => { console.log(event) }

  return <NucleusToggle checked onSwitchToggle={(event) => recordEventTrigger(event)} />
},

  EventControls.parameters = {
    docs: {
      description: {
        story: `The toggle component emits an event "switchToggle" upon click. Developers and subscribe to this event and trigger chained action.`
      },
      source: {
        type: 'tsx',
        format: true,
        code: `<NucleusToggle checked onSwitchToggle={(event) => recordEventTrigger(event)} />`
      }
    }
  }
