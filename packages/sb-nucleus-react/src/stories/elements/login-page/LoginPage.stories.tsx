import type { Meta, StoryObj } from "@storybook/react-vite";
import { NucleusAvatar, NucleusDropdown, NucleusFooter, NucleusHeader, NucleusInput } from "nucleus-react";

NucleusHeader.displayName = "NucleusHeader";
NucleusFooter.displayName = "NucleusFooter";
NucleusInput.displayName = "NucleusInput";
NucleusAvatar.displayName = "NucleusAvatar";
NucleusDropdown.displayName = "NucleusDropdown";

const meta = {
  title: "ELEMENTS/Login Page",
  tags: ["autodocs"],
  component: NucleusHeader,
} satisfies Meta<typeof NucleusHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      <NucleusHeader brand="Nucleus" menuOpen={false}>
        <span slot="brand">Nucleus</span>
        <a slot="nav" href="#">Home</a>
        <a slot="nav" href="#">Docs</a>
        <span slot="nav" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <NucleusDropdown
            items={["Profile", "Logout"]}
            label=""
            style={{ "--nucleus-dropdown-trigger-border": "none" } as any}
            onItemSelect={(event) => console.log("itemSelect", event.detail)}
          >
            <span slot="trigger" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <NucleusAvatar name="Nucleus User" size="sm" type="primary" />
              <span>Nucleus User</span>
            </span>
          </NucleusDropdown>
        </span>
      </NucleusHeader>

      <main style={{ flex: 1, display: "grid", placeItems: "center", padding: "24px" }}>
        <section
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "24px",
            display: "grid",
            gap: "12px",
          }}
        >
          <h2 style={{ margin: 0 }}>Login</h2>
          <NucleusInput type="email" placeholder="Email" size="md" variant="primary" />
          <NucleusInput type="password" placeholder="Password" size="md" variant="primary" />
          <button
            type="button"
            className="btn btn-primary btn-xl"
            style={{
              display: "block",
              width: "100%",
              minHeight: "52px",
              background: "#1fb6ff",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.125rem",
              fontWeight: 600,
            }}
          >
            Sign in
          </button>
        </section>
      </main>

      <NucleusFooter copyright="© Nucleus Design System">
        <a slot="links" href="#">Privacy</a>
      </NucleusFooter>
    </div>
  ),
};
