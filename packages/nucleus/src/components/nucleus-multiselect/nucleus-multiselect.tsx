import { Component, Element, Event, EventEmitter, Listen, Prop, State, Watch, h } from "@stencil/core";
import classNames from "classnames";

@Component({
  tag: "nucleus-multiselect",
  styleUrl: "nucleus-multiselect.scss",
  shadow: false,
})
export class NucleusMultiselect {
  @Element() el!: HTMLElement;

  @Prop() options: string[] = [];

  @Prop({ mutable: true }) value: string[] = [];

  @Prop() placeholder = "Select options";

  @State() open = false;

  @State() selectedValues: string[] = [];

  @Event() valueChange: EventEmitter<string[]>;

  @Watch("value")
  onValueChanged(newValue: string[]) {
    this.selectedValues = Array.isArray(newValue) ? [...newValue] : [];
  }

  componentWillLoad() {
    this.selectedValues = Array.isArray(this.value) ? [...this.value] : [];
  }

  @Listen("click", { target: "window" })
  handleOutsideClick(event: MouseEvent) {
    if (!this.el.contains(event.target as Node)) {
      this.open = false;
    }
  }

  private toggleOpen = () => {
    this.open = !this.open;
  };

  private onControlKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleOpen();
    }
  };

  private toggleOption = (option: string) => {
    const exists = this.selectedValues.includes(option);
    this.selectedValues = exists
      ? this.selectedValues.filter((item) => item !== option)
      : [...this.selectedValues, option];
    this.value = [...this.selectedValues];
    this.valueChange.emit(this.value);
  };

  private removeOption = (option: string) => {
    this.selectedValues = this.selectedValues.filter((item) => item !== option);
    this.value = [...this.selectedValues];
    this.valueChange.emit(this.value);
  };

  render() {
    return (
      <div class="nucleus-multiselect">
        <div
          class="nucleus-multiselect-control"
          role="button"
          tabIndex={0}
          onClick={this.toggleOpen}
          onKeyDown={this.onControlKeyDown}
        >
          <div class="nucleus-multiselect-values">
            {this.selectedValues.length === 0 ? (
              <span class="nucleus-multiselect-placeholder">{this.placeholder}</span>
            ) : (
              this.selectedValues.map((option) => (
                <nucleus-pill
                  type="primary"
                  shape="rounded"
                  removable
                  onPillClose={(event) => {
                    event.stopPropagation();
                    this.removeOption(option);
                  }}
                >
                  {option}
                </nucleus-pill>
              ))
            )}
          </div>
          <span class={classNames("nucleus-multiselect-chevron", { open: this.open })}>▾</span>
        </div>

        {this.open ? (
          <ul class="nucleus-multiselect-menu">
            {this.options.map((option) => {
              const selected = this.selectedValues.includes(option);
              return (
                <li>
                  <button
                    type="button"
                    class={classNames("nucleus-multiselect-option", { selected })}
                    onClick={(event) => {
                      event.stopPropagation();
                      this.toggleOption(option);
                    }}
                  >
                    <span>{option}</span>
                    {selected ? <span>✓</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}
