import { Component, Event, EventEmitter, Listen, Prop, h } from "@stencil/core";

@Component({
  tag: "nucleus-radio-group",
  shadow: false,
})
export class NucleusRadioGroup {
  @Prop({ mutable: true, reflect: true }) value = "";

  @Prop() name = "nucleus-radio-group";

  @Event() valueChange: EventEmitter<string>;

  @Listen("checkedChange")
  onCheckedChange(event: CustomEvent<string>) {
    this.value = event.detail;
    this.valueChange.emit(this.value);
  }

  render() {
    return (
      <div role="radiogroup">
        <slot />
      </div>
    );
  }
}
