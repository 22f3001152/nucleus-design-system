import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "nucleus-footer",
  styleUrl: "nucleus-footer.scss",
  shadow: false,
})
export class NucleusFooter {
  @Prop() copyright = "© Nucleus Design System";

  render() {
    return (
      <footer class="nucleus-footer">
        <div class="nucleus-footer-content">
          <slot name="links" />
          <span class="nucleus-footer-copy">{this.copyright}</span>
        </div>
      </footer>
    );
  }
}
