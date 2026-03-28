import { newSpecPage } from "@stencil/core/testing";
import { NucleusRadioGroup } from "./nucleus-radio-group";

describe("NucleusRadioGroup", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [NucleusRadioGroup],
      html: "<nucleus-radio-group></nucleus-radio-group>",
    });

    expect(page.root).toEqualHtml(`<nucleus-radio-group value="">
      <div role="radiogroup"></div>
    </nucleus-radio-group>`);
  });
});
