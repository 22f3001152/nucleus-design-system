import { newSpecPage } from "@stencil/core/testing";
import { NucleusHeader } from "./nucleus-header";

describe("NucleusHeader", () => {
  it("renders with default brand", async () => {
    const page = await newSpecPage({
      components: [NucleusHeader],
      html: "<nucleus-header></nucleus-header>",
    });

    expect(page.root?.textContent).toContain("Nucleus");
  });

  it("emits menu events", async () => {
    const page = await newSpecPage({
      components: [NucleusHeader],
      html: "<nucleus-header></nucleus-header>",
    });

    const menuToggle = jest.fn();
    const menuClose = jest.fn();

    page.root?.addEventListener("menuToggle", menuToggle);
    page.root?.addEventListener("menuClose", menuClose);

    const burger = page.root?.querySelector(".nucleus-header-burger") as HTMLButtonElement;
    burger.click();
    await page.waitForChanges();

    const close = page.root?.querySelector(".nucleus-header-close") as HTMLButtonElement;
    close.click();
    await page.waitForChanges();

    expect(menuToggle).toHaveBeenCalled();
    expect(menuClose).toHaveBeenCalled();
  });
});
