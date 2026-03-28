import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-header",
  styleUrl: "nucleus-header.scss",
  shadow: false,
})
export class NucleusHeader {
  @Prop() brand = "Nucleus";

  @Prop({ mutable: true, reflect: true }) menuOpen = false;

  @Event() menuToggle: EventEmitter<boolean>;

  @Event() menuClose: EventEmitter<void>;

  private toggleMenu = () => {
    this.menuOpen = !this.menuOpen;
    this.menuToggle.emit(this.menuOpen);
    if (!this.menuOpen) {
      this.menuClose.emit();
    }
  };

  private closeMenu = () => {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.menuToggle.emit(false);
    }
    this.menuClose.emit();
  };

  render() {
    return (
      <header class="nucleus-header">
        <div class="nucleus-header-bar">
          <div class="nucleus-header-brand">
            <slot name="brand">{this.brand}</slot>
          </div>
          <button
            type="button"
            class="nucleus-header-burger"
            onClick={this.toggleMenu}
            aria-label={this.menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={this.menuOpen ? "true" : "false"}
          >
            {this.menuOpen ? "✕" : "☰"}
          </button>
          <nav class={classNames("nucleus-header-nav", { "nucleus-header-nav-open": this.menuOpen })}>
            <button type="button" class="nucleus-header-close" onClick={this.closeMenu}>
              Close
            </button>
            <slot name="nav" />
          </nav>
        </div>
      </header>
    );
  }
}
