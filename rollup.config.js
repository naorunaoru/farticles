import { nodeResolve } from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [nodeResolve(), serve("public"), livereload("public")],
};
