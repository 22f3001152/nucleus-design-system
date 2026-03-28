import { Component, Event, EventEmitter, Prop, State, Watch, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-pill",
  styleUrl: "nucleus-pill.scss",
  shadow: false,
})
export class NucleusPill {
  @Prop() shape: "rounded" | "rectangle" = "rounded";

  @Prop() type: "primary" | "secondary" = "primary";

  @Prop() closed = false;

  @Prop() removable = true;

  @State() dismissed = false;

  @Event() pillClose: EventEmitter<void>;

  private toBoolean = (value: boolean | string) => {
    if (typeof value === "boolean") return value;
    return value === "" || value.toLowerCase() === "true";
  };

  @Watch("closed")
  handleClosedChange(newValue: boolean | string) {
    this.dismissed = this.toBoolean(newValue);
  }

  componentWillLoad() {
    this.dismissed = this.toBoolean(this.closed);
  }

  private onClose = () => {
    this.dismissed = true;
    this.pillClose.emit();
  };

  render() {
    if (this.dismissed) return null;

    return (
      <span class={classNames("nucleus-pill", `nucleus-pill-${this.shape}`, `nucleus-pill-${this.type}`)}>
        <span class="nucleus-pill-label">
          <slot />
        </span>
        {this.toBoolean(this.removable) ? (
          <button type="button" class="nucleus-pill-close" aria-label="Close pill" onClick={this.onClose}>
            ×
          </button>
        ) : null}
      </span>
    );
  }
}
