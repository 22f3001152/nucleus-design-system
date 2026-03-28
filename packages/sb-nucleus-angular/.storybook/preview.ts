import { componentWrapperDecorator, moduleMetadata, type Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { CommonModule } from "@angular/common";
import { enableProdMode } from "@angular/core";
import { NucleusComponentLibraryModule } from "nucleus-ng-component-library";
import { defineCustomElements } from "nucleus/loader";

setCompodocJson(docJson);
enableProdMode();
defineCustomElements();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    decorator: [
      moduleMetadata({
        providers: [],
        imports: [CommonModule, NucleusComponentLibraryModule]
      })
    ],
    viewMode: 'story',
    docs: {
      toc: {
        title: 'Table of Contents',
        contentsSelector: '.sbdocs-content'
      },
      canvas: {
        sourceState: 'shown'
      },
      story: {
        inline: true
      }
    },
    direction: 'ltr',
    backgrounds: { disabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ["Overview", "Foundations", "ATOMS", "MOLECULES", "ELEMENTS", "Patterns", "Resources"],
      },
    },
  },
};

export const decorators = [
  componentWrapperDecorator((story: any) => `<div class="nucleus-container">${story}</div>`),
];

export default preview;
