import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import styles from "rollup-plugin-styles";

export default [
	{
		input: "./src/client/site.ts",
		output: {
			dir: "public/assets/js/",
			format: "iife",
			sourcemap: true,
		},
		plugins: [
			commonjs(),
			nodeResolve({
				extensions: [".tsx", ".ts", ".js"],
				browser: true,
			}),
			typescript({
				tsconfig: "./tsconfig.json",
				exclude: "node_modules/**",
			}),
			styles(),
		],
	},
];
