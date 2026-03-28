import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-radio",
  styleUrl: "nucleus-radio.scss",
  shadow: false,
})
export class NucleusRadio {
  @Prop({ mutable: true, reflect: true }) checked = false;

  @Prop() value = "";

  @Prop() name = "";

  @Prop() disabled = false;

  @Prop() required = false;

  @Prop() variant: "primary" | "secondary" = "primary";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Event() checkedChange: EventEmitter<string>;

  private onChange = (event: Event) => {
    const element = event.target as HTMLInputElement;
    this.checked = element.checked;
    if (this.checked) {
      this.checkedChange.emit(this.value);
    }
  };

  render() {
    return (
      <label class={classNames("nucleus-radio", { "nucleus-radio-disabled": this.disabled })}>
        <input
          type="radio"
          checked={this.checked}
          value={this.value}
          name={this.name}
          disabled={this.disabled}
          required={this.required}
          onInput={this.onChange}
        />
        <span
          class={classNames("nucleus-radio-indicator", `nucleus-radio-${this.variant}`, `nucleus-radio-${this.size}`)}
        />
        <span class="nucleus-radio-label">
          <slot />
        </span>
      </label>
    );
  }
}
