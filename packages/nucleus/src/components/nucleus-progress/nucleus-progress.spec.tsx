import { newSpecPage } from "@stencil/core/testing";
import { NucleusProgress } from "./nucleus-progress";

describe("NucleusProgress", () => {
  it("renders determinate progress", async () => {
    const page = await newSpecPage({
      components: [NucleusProgress],
      html: "<nucleus-progress value='50'></nucleus-progress>",
    });

    expect(page.root).toEqualHtml(`<nucleus-progress value="50">
      <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="50" class="nucleus-progress nucleus-progress-md" role="progressbar">
        <div class="nucleus-progress-bar nucleus-progress-primary" style="width:50%;"></div>
      </div>
    </nucleus-progress>`);
  });

  it("renders indeterminate progress", async () => {
    const page = await newSpecPage({
      components: [NucleusProgress],
      html: "<nucleus-progress indeterminate></nucleus-progress>",
    });

    expect(page.root?.querySelector(".nucleus-progress-indeterminate")).not.toBeNull();
  });
});
