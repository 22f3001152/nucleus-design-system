import { newSpecPage } from "@stencil/core/testing";
import { NucleusButton } from "./nucleus-button";

describe("Nucleus Button Testing", () => {
  it("should render primary button component", async () => {
    const page = await newSpecPage({
      components: [NucleusButton],
      html: "<nucleus-button>Success!!</nucleus-button>",
    });
    expect(page.root).toEqualHtml(`<nucleus-button>
            <button class="btn btn-md btn-primary" type="button">
                Success!!
            </button>
        </nucleus-button>`);
  });

  it("should render secondary button component", async () => {
    const page = await newSpecPage({
      components: [NucleusButton],
      html: "<nucleus-button type='secondary'>Success!!</nucleus-button>",
    });
    expect(page.root).toEqualHtml(`<nucleus-button type='secondary'>
            <button class="btn btn-md btn-secondary" type="button">
                Success!!
            </button>
        </nucleus-button>`);
  });

  it("when nucleus button is disabled.", async () => {
    const page = await newSpecPage({
      components: [NucleusButton],
      html: "<nucleus-button type='secondary' disabled>Disabled</nucleus-button>",
    });
    expect(page.root).toEqualHtml(`<nucleus-button type='secondary' disabled>
            <button class="btn btn-md btn-secondary disabled" type="button">
                Disabled
            </button>
        </nucleus-button>`);
  });
});
