import { newSpecPage } from "@stencil/core/testing";
import { NucleusCheckbox } from "./nucleus-checkbox";

describe("NucleusCheckbox", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [NucleusCheckbox],
      html: "<nucleus-checkbox>Option</nucleus-checkbox>",
    });

    expect(page.root).toEqualHtml(`<nucleus-checkbox>
      <label class="nucleus-checkbox">
        <input type="checkbox">
        <span class="nucleus-checkbox-indicator nucleus-checkbox-primary nucleus-checkbox-md"></span>
        <span class="nucleus-checkbox-label">Option</span>
      </label>
    </nucleus-checkbox>`);
  });

  it("emits checkedChange", async () => {
    const page = await newSpecPage({
      components: [NucleusCheckbox],
      html: "<nucleus-checkbox></nucleus-checkbox>",
    });

    const checkedChange = jest.fn();
    page.root?.addEventListener("checkedChange", checkedChange);

    const input = page.root?.querySelector("input") as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event("input"));
    await page.waitForChanges();

    expect(checkedChange).toHaveBeenCalled();
  });
});
