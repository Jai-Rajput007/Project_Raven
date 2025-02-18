// eslint.config.js (or .eslintrc.js if you're using the legacy format)
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends([
    "next/core-web-vitals", 
    "next"
  ]),
  {
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
];

export default eslintConfig;
