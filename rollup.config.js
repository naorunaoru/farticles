import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/particleSystem.js",
    output: {
      name: "ParticleSystem",
      file: "dist/particleSystem.js",
      format: "es",
      sourcemap: !production,
    },
    plugins: [production && terser()].filter(Boolean),
  },
  {
    input: "src/main.js",
    output: {
      file: "public/bundle.js",
      format: "iife",
      sourcemap: !production,
    },
    plugins: [
      nodeResolve(),
      !production && serve("public"),
      !production && livereload("public"),
    ].filter(Boolean),
  },
];
