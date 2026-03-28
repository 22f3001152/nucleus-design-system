import { newSpecPage } from "@stencil/core/testing";
import { NucleusRadio } from "./nucleus-radio";

describe("NucleusRadio", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [NucleusRadio],
      html: "<nucleus-radio value='one'>One</nucleus-radio>",
    });

    expect(page.root).toEqualHtml(`<nucleus-radio value="one">
      <label class="nucleus-radio">
        <input type="radio" value="one">
        <span class="nucleus-radio-indicator nucleus-radio-primary nucleus-radio-md"></span>
        <span class="nucleus-radio-label">One</span>
      </label>
    </nucleus-radio>`);
  });

  it("emits checkedChange when checked", async () => {
    const page = await newSpecPage({
      components: [NucleusRadio],
      html: "<nucleus-radio value='one'></nucleus-radio>",
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
