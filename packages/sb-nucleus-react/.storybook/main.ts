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
    
    // Force Rollup/Vite to resolve the explicit path for nucleus/loader in a monorepo
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['nucleus/loader'] = join(dirname(fileURLToPath(import.meta.url)), '../../nucleus/loader/index.js');
    
    return config;
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
