import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta = {
  title: "ELEMENTS/Login Page",
  tags: ["autodocs"],
};

export default meta;

export const Primary: StoryObj = {
  render: () => ({
    props: {
      onItemSelect: (event: CustomEvent<string>) => console.log("itemSelect", event.detail),
    },
    template: `
      <div style="min-height:100vh;display:flex;flex-direction:column;background:#f8fafc;">
        <nucleus-header brand="Nucleus" [menuOpen]="false">
          <span slot="brand">Nucleus</span>
          <a slot="nav" href="#">Home</a>
          <a slot="nav" href="#">Docs</a>
          <span slot="nav" style="display:inline-flex;align-items:center;gap:10px;">
            <nucleus-dropdown
              label=""
              style="--nucleus-dropdown-trigger-border:none;"
              [items]="['Profile','Logout']"
              (itemSelect)="onItemSelect($event)"
            >
              <span slot="trigger" style="display:inline-flex;align-items:center;gap:8px;">
                <nucleus-avatar name="Nucleus User" size="sm" type="primary"></nucleus-avatar>
                <span>Nucleus User</span>
              </span>
            </nucleus-dropdown>
          </span>
        </nucleus-header>

        <main style="flex:1;display:grid;place-items:center;padding:24px;">
          <section style="width:100%;max-width:420px;background:white;border:1px solid #e2e8f0;border-radius:12px;padding:24px;display:grid;gap:12px;">
            <h2 style="margin:0;">Login</h2>
            <nucleus-input type="email" placeholder="Email" size="md" variant="primary"></nucleus-input>
            <nucleus-input type="password" placeholder="Password" size="md" variant="primary"></nucleus-input>
            <button type="button" class="btn btn-primary btn-xl" style="display:block;width:100%;min-height:52px;background:#1fb6ff;color:#ffffff;border:none;border-radius:8px;font-size:1.125rem;font-weight:600;">Sign in</button>
          </section>
        </main>

        <nucleus-footer copyright="© Nucleus Design System">
          <a slot="links" href="#">Privacy</a>
        </nucleus-footer>
      </div>
    `,
  }),
};
