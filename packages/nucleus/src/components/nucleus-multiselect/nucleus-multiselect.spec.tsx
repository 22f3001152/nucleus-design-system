import { newSpecPage } from "@stencil/core/testing";
import { NucleusMultiselect } from "./nucleus-multiselect";

describe("NucleusMultiselect", () => {
  it("renders placeholder", async () => {
    const page = await newSpecPage({
      components: [NucleusMultiselect],
      html: "<nucleus-multiselect></nucleus-multiselect>",
    });

    expect(page.root?.textContent).toContain("Select options");
  });

  it("emits valueChange when option toggles", async () => {
    const page = await newSpecPage({
      components: [NucleusMultiselect],
      html: "<nucleus-multiselect></nucleus-multiselect>",
    });

    page.rootInstance.options = ["React", "Angular"];
    await page.waitForChanges();

    const valueChange = jest.fn();
    page.root?.addEventListener("valueChange", valueChange);

    const control = page.root?.querySelector(".nucleus-multiselect-control") as HTMLDivElement;
    control.click();
    await page.waitForChanges();

    const option = page.root?.querySelector(".nucleus-multiselect-option") as HTMLButtonElement;
    option.click();
    await page.waitForChanges();

    expect(valueChange).toHaveBeenCalled();
  });
});
