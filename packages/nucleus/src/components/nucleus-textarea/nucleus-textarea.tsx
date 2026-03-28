import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-textarea",
  styleUrl: "nucleus-textarea.scss",
  shadow: false,
})
export class NucleusTextarea {
  @Prop({ mutable: true, reflect: true }) value = "";

  @Prop() placeholder = "";

  @Prop() variant: "primary" | "secondary" = "primary";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Prop() rows = 4;

  @Prop() disabled = false;

  @Prop() readonly = false;

  @Prop() required = false;

  @Prop() invalid = false;

  @Event() valueChange: EventEmitter<string>;

  private onInput = (event: Event) => {
    const element = event.target as HTMLTextAreaElement;
    this.value = element.value;
    this.valueChange.emit(this.value);
  };

  render() {
    return (
      <textarea
        rows={this.rows}
        class={classNames("nucleus-textarea", `nucleus-textarea-${this.variant}`, `nucleus-textarea-${this.size}`, {
          "nucleus-textarea-disabled": this.disabled,
          "nucleus-textarea-invalid": this.invalid,
        })}
        placeholder={this.placeholder}
        disabled={this.disabled}
        readOnly={this.readonly}
        required={this.required}
        aria-invalid={this.invalid ? "true" : "false"}
        onInput={this.onInput}
      >
        {this.value}
      </textarea>
    );
  }
}
