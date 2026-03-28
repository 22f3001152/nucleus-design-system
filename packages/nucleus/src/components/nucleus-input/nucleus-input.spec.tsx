import { newSpecPage } from "@stencil/core/testing";
import { NucleusInput } from "./nucleus-input";

describe("NucleusInput", () => {
  it("renders with defaults", async () => {
    const page = await newSpecPage({
      components: [NucleusInput],
      html: "<nucleus-input></nucleus-input>",
    });

    expect(page.root).toEqualHtml(`<nucleus-input value="">
      <input aria-invalid="false" class="nucleus-input nucleus-input-primary nucleus-input-md" placeholder="" type="text" value="">
    </nucleus-input>`);
  });

  it("emits valueChange on input", async () => {
    const page = await newSpecPage({
      components: [NucleusInput],
      html: "<nucleus-input></nucleus-input>",
    });

    const valueChange = jest.fn();
    page.root?.addEventListener("valueChange", valueChange);

    const input = page.root?.querySelector("input") as HTMLInputElement;
    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    await page.waitForChanges();

    expect(valueChange).toHaveBeenCalled();
  });
});
