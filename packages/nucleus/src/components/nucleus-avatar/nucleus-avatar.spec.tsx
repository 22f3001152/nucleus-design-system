import { newSpecPage } from "@stencil/core/testing";
import { NucleusAvatar } from "./nucleus-avatar";

describe("NucleusAvatar", () => {
  it("renders initials fallback", async () => {
    const page = await newSpecPage({
      components: [NucleusAvatar],
      html: "<nucleus-avatar name='Nucleus DS'></nucleus-avatar>",
    });

    expect(page.root?.textContent).toContain("ND");
  });
});
