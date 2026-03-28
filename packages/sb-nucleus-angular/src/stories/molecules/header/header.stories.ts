import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "MOLECULES/Header",
  tags: ["autodocs"],
  args: {
    brand: "Nucleus",
    menuOpen: false,
  },
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: {
      ...args,
      onMenuToggle: (event: CustomEvent<boolean>) => console.log("menuToggle", event.detail),
      onMenuClose: () => console.log("menuClose"),
    },
    template: `
      <nucleus-header
        [brand]="brand"
        [menuOpen]="menuOpen"
        (menuToggle)="onMenuToggle($event)"
        (menuClose)="onMenuClose()"
      >
        <span slot="brand">{{brand}}</span>
        <a slot="nav" href="#">Home</a>
        <a slot="nav" href="#">Docs</a>
        <a slot="nav" href="#">Contact</a>
      </nucleus-header>
    `,
  }),
};
