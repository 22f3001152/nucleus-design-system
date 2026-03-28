import { Component, Element, Event, EventEmitter, Listen, Prop, State, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-dropdown",
  styleUrl: "nucleus-dropdown.scss",
  shadow: false,
})
export class NucleusDropdown {
  @Element() el!: HTMLElement;

  @Prop() label = "Menu";

  @Prop() items: string[] = ["Profile", "Logout"];

  @Prop({ mutable: true, reflect: true }) open = false;

  @State() internalItems: string[] = [];

  @Event() dropdownToggle: EventEmitter<boolean>;

  @Event() itemSelect: EventEmitter<string>;

  componentWillLoad() {
    this.internalItems = Array.isArray(this.items) ? [...this.items] : [];
  }

  @Listen("click", { target: "window" })
  handleOutsideClick(event: MouseEvent) {
    if (!this.el.contains(event.target as Node) && this.open) {
      this.open = false;
      this.dropdownToggle.emit(false);
    }
  }

  private toggleOpen = () => {
    this.open = !this.open;
    this.dropdownToggle.emit(this.open);
  };

  private onSelect = (item: string) => {
    this.itemSelect.emit(item);
    this.open = false;
    this.dropdownToggle.emit(false);
  };

  render() {
    return (
      <div class="nucleus-dropdown">
        <button
          type="button"
          class="nucleus-dropdown-trigger"
          aria-haspopup="menu"
          aria-expanded={this.open ? "true" : "false"}
          onClick={this.toggleOpen}
        >
          <span class="nucleus-dropdown-trigger-content">
            <slot name="trigger">{this.label}</slot>
          </span>
          <span class={classNames("nucleus-dropdown-chevron", { open: this.open })}>▾</span>
        </button>
        {this.open ? (
          <ul class="nucleus-dropdown-menu" role="menu">
            {this.internalItems.map((item) => (
              <li role="none">
                <button type="button" role="menuitem" class="nucleus-dropdown-item" onClick={() => this.onSelect(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
