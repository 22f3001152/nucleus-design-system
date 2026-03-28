import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-docs")],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config: any, { configType }: { configType: string }) {
    if (configType === 'PRODUCTION') {
      config.base = '/nucleus-design-system/';
    }
    
    // Resolve all nucleus/* subpath imports (loader, components, etc.) to the sibling workspace package
    const nucleusRoot = join(dirname(fileURLToPath(import.meta.url)), '../../nucleus');
    config.resolve = config.resolve || {};
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
      { find: /^nucleus\/(.*)$/, replacement: join(nucleusRoot, '$1') },
      { find: /^nucleus$/, replacement: join(nucleusRoot, 'dist/index.js') },
    ];
    
    return config;
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
