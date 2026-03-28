import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  designSystemSidebar: [
    {
      type: 'category',
      label: 'Design System Overview',
      items: [
        'nucleus-design-system/intro',
        'nucleus-design-system/web-components'
      ],
    },
    {
      type: 'category',
      label: 'Developer Documentation',
      items: [
        'nucleus-design-system-dev-setup/getting-started'
      ],
    },
  ]
};

export default sidebars;
