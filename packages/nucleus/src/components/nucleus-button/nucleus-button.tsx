import { Component, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-button",
  styleUrl: "nucleus-button.scss",
  shadow: false,
})
export class NucleusButton {
  @Prop() type: "primary" | "secondary" = "primary";

  @Prop() rounded: true | false = false;

  @Prop() disabled: true | false = false;

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  render() {
    return (
      <button
        type="button"
        class={classNames("btn", {
          [`btn-${this.type}`]: true,
          rounded: this.rounded,
          disabled: this.disabled,
          [`btn-${this.size}`]: true,
        })}
      >
        <slot />
      </button>
    );
  }
}
