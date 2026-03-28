import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "MOLECULES/Footer",
  tags: ["autodocs"],
  args: {
    copyright: "© Nucleus Design System",
  },
};

export default meta;

export const Primary: StoryObj = {
  render: (args: any) => ({
    props: args,
    template: `
      <nucleus-footer [copyright]="copyright">
        <a slot="links" href="#">Privacy</a>
        <a slot="links" href="#">Terms</a>
      </nucleus-footer>
    `,
  }),
};
