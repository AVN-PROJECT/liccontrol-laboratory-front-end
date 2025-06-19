// eslint.config.mjs

import js from '@eslint/js';
import globals from 'globals';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser'; // <----- добавить!
import tsParser from '@typescript-eslint/parser'; // <----- добавить!

export default [
  eslintConfigPrettier,
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parser: vueParser, // <-- обязательно импортированный объект!
      parserOptions: {
        parser: tsParser, // <-- обязательно импортированный объект!
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        _: false,
      },
    },
    plugins: {
      vue,
      prettier,
      '@typescript-eslint': tseslint,
    },
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    rules: {
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/script-indent': 'off',
      indent: 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'prettier/prettier': 'error',
    },
  },
];
