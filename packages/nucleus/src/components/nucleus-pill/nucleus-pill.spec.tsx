import { newSpecPage } from "@stencil/core/testing";
import { NucleusPill } from "./nucleus-pill";

describe("NucleusPill", () => {
  it("renders rounded pill by default", async () => {
    const page = await newSpecPage({
      components: [NucleusPill],
      html: "<nucleus-pill>Label</nucleus-pill>",
    });

    expect(page.root?.querySelector(".nucleus-pill-rounded")).not.toBeNull();
  });

  it("closes pill and emits event", async () => {
    const page = await newSpecPage({
      components: [NucleusPill],
      html: "<nucleus-pill>Label</nucleus-pill>",
    });

    const pillClose = jest.fn();
    page.root?.addEventListener("pillClose", pillClose);

    const closeButton = page.root?.querySelector(".nucleus-pill-close") as HTMLButtonElement;
    closeButton.click();
    await page.waitForChanges();

    expect(pillClose).toHaveBeenCalled();
    expect(page.root?.innerHTML).toBe("");
  });
});
