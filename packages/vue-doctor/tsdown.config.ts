import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/cli.ts"],
    format: "esm",
    dts: true,
    clean: true,
    banner: { js: "#!/usr/bin/env node" },
  },
  {
    entry: ["src/index.ts"],
    format: "esm",
    dts: true,
  },
]);
