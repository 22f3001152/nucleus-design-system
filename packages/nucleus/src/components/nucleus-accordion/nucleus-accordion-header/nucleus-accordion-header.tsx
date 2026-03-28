import { Component, h } from "@stencil/core";

@Component({
  tag: "nucleus-accordion-header",
  styleUrl: "nucleus-accordion-header.scss",
  shadow: false,
})
export class NucleusAccordionHeader {
  render() {
    return (
      <h2>
        <button
          type="button"
          class="nucleus-accordion-header-button"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <span>What is Flowbite?</span>
          <svg
            data-accordion-icon
            class="nucleus-accordion-header-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
    );
  }
}
