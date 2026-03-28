import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-toggle",
  styleUrl: "nucleus-toggle.scss",
  shadow: false,
})
export class NucleusToggle {
  @Prop({ mutable: true, reflect: true }) checked = false;

  @Prop() type: "primary" | "secondary" = "primary";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Prop() disabled = false;

  @Event() switchToggle: EventEmitter<boolean>;

  triggerToggle = () => {
    this.checked = !this.checked;
    this.switchToggle.emit(this.checked);
  };

  render() {
    const type = this.type ?? "primary";
    const size = this.size ?? "md";

    return (
      <label class="nucleus-toggle">
        <input
          role="checkbox"
          aria-checked={this.checked}
          tabIndex={0}
          checked={this.checked}
          disabled={this.disabled}
          aria-label="nucleus-toggle"
          onClick={() => this.triggerToggle()}
          type="checkbox"
          placeholder="false"
          title="nucleus-toggle"
          value=""
          class="nucleus-toggle-input"
        />
        <div
          class={classNames("nucleus-toggle-track", {
            [`nucleus-toggle-${type}`]: true,
            [`nucleus-toggle-${size}`]: true,
          })}
        />
      </label>
    );
  }
}
