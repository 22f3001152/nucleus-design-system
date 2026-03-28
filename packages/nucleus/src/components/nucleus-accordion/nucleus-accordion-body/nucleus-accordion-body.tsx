import { Component, h } from "@stencil/core";

@Component({
  tag: "nucleus-accordion-body",
  styleUrl: "nucleus-accordion-body.scss",
  shadow: false,
})
export class NucleusAccordionBody {
  render() {
    return (
      <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
        <div class="nucleus-accordion-body-content">
          <p class="nucleus-accordion-body-text">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p class="nucleus-accordion-body-text">
            Check out this guide to learn how to{" "}
            <a href="/docs/getting-started/introduction/" class="nucleus-accordion-body-link">
              get started
            </a>{" "}
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </div>
      </div>
    );
  }
}
