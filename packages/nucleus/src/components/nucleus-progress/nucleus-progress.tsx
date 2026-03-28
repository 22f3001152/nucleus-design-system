import { Component, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-progress",
  styleUrl: "nucleus-progress.scss",
  shadow: false,
})
export class NucleusProgress {
  @Prop() value = 0;

  @Prop() max = 100;

  @Prop() variant: "primary" | "secondary" = "primary";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Prop() indeterminate = false;

  private get normalizedValue() {
    if (this.indeterminate) return 0;
    if (this.max <= 0) return 0;
    const bounded = Math.min(Math.max(this.value, 0), this.max);
    return (bounded / this.max) * 100;
  }

  render() {
    return (
      <div
        class={classNames("nucleus-progress", `nucleus-progress-${this.size}`)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={this.max}
        aria-valuenow={this.indeterminate ? undefined : Math.round(this.normalizedValue)}
      >
        <div
          class={classNames("nucleus-progress-bar", `nucleus-progress-${this.variant}`, {
            "nucleus-progress-indeterminate": this.indeterminate,
          })}
          style={this.indeterminate ? undefined : { width: `${this.normalizedValue}%` }}
        />
      </div>
    );
  }
}
