import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";

export default [
  js.configs.recommended,

  ...vue.configs["flat/essential"],

  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
];
