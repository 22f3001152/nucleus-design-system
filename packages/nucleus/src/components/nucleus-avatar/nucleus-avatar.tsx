import { Component, Prop, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-avatar",
  styleUrl: "nucleus-avatar.scss",
  shadow: false,
})
export class NucleusAvatar {
  @Prop() src = "";

  @Prop() alt = "Avatar";

  @Prop() name = "";

  @Prop() shape: "circle" | "square" = "circle";

  @Prop() size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  @Prop() type: "primary" | "secondary" = "primary";

  private get initials() {
    const parts = this.name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "NA";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  render() {
    const wrapperClass = classNames(
      "nucleus-avatar",
      `nucleus-avatar-${this.shape}`,
      `nucleus-avatar-${this.size}`,
      `nucleus-avatar-${this.type}`,
    );

    if (this.src) {
      return <img class={wrapperClass} src={this.src} alt={this.alt} />;
    }

    return <span class={wrapperClass}>{this.initials}</span>;
  }
}
