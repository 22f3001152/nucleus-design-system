import { newSpecPage } from "@stencil/core/testing";
import { NucleusTextarea } from "./nucleus-textarea";

describe("NucleusTextarea", () => {
  it("renders with defaults", async () => {
    const page = await newSpecPage({
      components: [NucleusTextarea],
      html: "<nucleus-textarea></nucleus-textarea>",
    });

    expect(page.root).toEqualHtml(`<nucleus-textarea value="">
      <textarea aria-invalid="false" class="nucleus-textarea nucleus-textarea-primary nucleus-textarea-md" placeholder="" rows="4"></textarea>
    </nucleus-textarea>`);
  });

  it("emits valueChange on input", async () => {
    const page = await newSpecPage({
      components: [NucleusTextarea],
      html: "<nucleus-textarea></nucleus-textarea>",
    });

    const valueChange = jest.fn();
    page.root?.addEventListener("valueChange", valueChange);

    const textarea = page.root?.querySelector("textarea") as HTMLTextAreaElement;
    textarea.value = "hello";
    textarea.dispatchEvent(new Event("input"));
    await page.waitForChanges();

    expect(valueChange).toHaveBeenCalled();
  });
});
