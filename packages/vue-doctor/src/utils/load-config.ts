import fs from "node:fs";
import path from "node:path";
import type { VueDoctorConfig } from "../types.js";

const CONFIG_FILENAMES = [
  "vue-doctor.config.json",
  "vue-doctor.config.js",
  "vue-doctor.config.mjs",
  ".vue-doctor.json",
];

export const loadConfig = (rootDirectory: string): VueDoctorConfig | null => {
  for (const filename of CONFIG_FILENAMES) {
    const configPath = path.join(rootDirectory, filename);
    if (fs.existsSync(configPath)) {
      if (filename.endsWith(".json")) {
        const content = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(content) as VueDoctorConfig;
      }
    }
  }

  const packageJsonPath = path.join(rootDirectory, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    if (packageJson["vue-doctor"]) {
      return packageJson["vue-doctor"] as VueDoctorConfig;
    }
  }

  return null;
};
