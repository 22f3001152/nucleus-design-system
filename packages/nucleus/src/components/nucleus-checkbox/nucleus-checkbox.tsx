import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-checkbox",
  styleUrl: "nucleus-checkbox.scss",
  shadow: false,
})
export class NucleusCheckbox {
  @Prop({ mutable: true, reflect: true }) checked = false;

  @Prop() disabled = false;

  @Prop() required = false;

  @Prop() variant: "primary" | "secondary" = "primary";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Event() checkedChange: EventEmitter<boolean>;

  private onChange = (event: Event) => {
    const element = event.target as HTMLInputElement;
    this.checked = element.checked;
    this.checkedChange.emit(this.checked);
  };

  render() {
    return (
      <label class={classNames("nucleus-checkbox", { "nucleus-checkbox-disabled": this.disabled })}>
        <input
          type="checkbox"
          checked={this.checked}
          disabled={this.disabled}
          required={this.required}
          onInput={this.onChange}
        />
        <span
          class={classNames(
            "nucleus-checkbox-indicator",
            `nucleus-checkbox-${this.variant}`,
            `nucleus-checkbox-${this.size}`,
          )}
        />
        <span class="nucleus-checkbox-label">
          <slot />
        </span>
      </label>
    );
  }
}
