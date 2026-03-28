/** @type { import('@storybook/react-vite').Preview } */
import { defineCustomElements } from 'nucleus-react';
import '../../nucleus/dist/nucleus/nucleus.css';

defineCustomElements();

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    viewMode: 'story',
    direction: 'ltr',
    docs: {
      toc: {
        title: 'Table of Contents',
        contentsSelector: '.sbdocs-content'
      },
      canvas: {
        sourceState: 'shown'
      }
    },
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

export default preview;
