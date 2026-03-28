import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-input",
  styleUrl: "nucleus-input.scss",
  shadow: false,
})
export class NucleusInput {
  @Prop({ mutable: true, reflect: true }) value = "";

  @Prop() type: "text" | "email" | "password" | "search" = "text";

  @Prop() placeholder = "";

  @Prop() variant: "primary" | "secondary" = "primary";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Prop() disabled = false;

  @Prop() readonly = false;

  @Prop() required = false;

  @Prop() invalid = false;

  @Event() valueChange: EventEmitter<string>;

  private onInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    this.value = element.value;
    this.valueChange.emit(this.value);
  };

  render() {
    return (
      <input
        type={this.type}
        class={classNames("nucleus-input", `nucleus-input-${this.variant}`, `nucleus-input-${this.size}`, {
          "nucleus-input-disabled": this.disabled,
          "nucleus-input-invalid": this.invalid,
        })}
        value={this.value}
        placeholder={this.placeholder}
        disabled={this.disabled}
        readOnly={this.readonly}
        required={this.required}
        aria-invalid={this.invalid ? "true" : "false"}
        onInput={this.onInput}
      />
    );
  }
}
