import { newSpecPage } from "@stencil/core/testing";
import { NucleusFooter } from "./nucleus-footer";

describe("NucleusFooter", () => {
  it("renders with default copyright", async () => {
    const page = await newSpecPage({
      components: [NucleusFooter],
      html: "<nucleus-footer></nucleus-footer>",
    });

    expect(page.root?.textContent).toContain("Nucleus Design System");
  });
});
