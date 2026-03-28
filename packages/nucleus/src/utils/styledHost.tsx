import { Host, getAssetPath, h } from "@stencil/core";

export const StyledHost: typeof Host = (attrs, children) => {
  return (
    <Host {...attrs}>
      <link rel="stylesheet" href={getAssetPath("nucleus.css")} />
      {children}
    </Host>
  );
};
