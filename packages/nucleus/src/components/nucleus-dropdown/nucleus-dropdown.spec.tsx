import { newSpecPage } from "@stencil/core/testing";
import { NucleusDropdown } from "./nucleus-dropdown";

describe("NucleusDropdown", () => {
  it("toggles and emits events", async () => {
    const page = await newSpecPage({
      components: [NucleusDropdown],
      html: "<nucleus-dropdown></nucleus-dropdown>",
    });

    const dropdownToggle = jest.fn();
    const itemSelect = jest.fn();
    page.root?.addEventListener("dropdownToggle", dropdownToggle);
    page.root?.addEventListener("itemSelect", itemSelect);

    const trigger = page.root?.querySelector(".nucleus-dropdown-trigger") as HTMLButtonElement;
    trigger.click();
    await page.waitForChanges();

    const firstItem = page.root?.querySelector(".nucleus-dropdown-item") as HTMLButtonElement;
    firstItem.click();
    await page.waitForChanges();

    expect(dropdownToggle).toHaveBeenCalled();
    expect(itemSelect).toHaveBeenCalled();
  });
});
