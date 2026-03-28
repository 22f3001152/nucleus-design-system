import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { reactOutputTarget } from "@stencil/react-output-target";
import { angularOutputTarget } from "@stencil/angular-output-target";

export const config: Config = {
	namespace: "nucleus",
	taskQueue: "async",
	globalStyle: "./src/styles/styles.scss",
	outputTargets: [
		{
			type: "dist",
			esmLoaderPath: "../loader",
		},
		{
			type: "dist-custom-elements",
			dir: "components",
			externalRuntime: false,
		},
		{
			type: "dist",
			copy: [
				{
					src: "fonts",
					warn: true,
				},
			],
		},
		reactOutputTarget({
			componentCorePackage: "nucleus",
			outDir: "../nucleus-react/lib/components/react-lib",
		}),
		angularOutputTarget({
			componentCorePackage: "nucleus",
			outputType: "component",
			directivesProxyFile:
				"../nucleus-angular/projects/nucleus-ng-component-library/src/lib/nucleus-ng-component-library/proxies.ts",
		}),
	],
	plugins: [sass()],
	testing: {
		browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
		coverageThreshold: {
			global: {
				branches: 0,
				functions: 0,
				lines: 0,
				statement: 0
			}
		},
		coverageDirectory: '../../reports',
		coverageReporters: ['cobertura', 'lcov'],
		reporters: ["default", "jest-junit"]
	},
	devServer: {
		reloadStrategy: "hmr",
		initialLoadUrl: "/src"
	},
};
