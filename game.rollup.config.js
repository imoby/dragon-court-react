import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import styles from "rollup-plugin-styles";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "./src/client/entry.tsx",
    output: {
      dir: "public/assets/js/",
      format: "es",
    },
    plugins: [
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      typescript(),
      styles(),
    ],
  },
];
