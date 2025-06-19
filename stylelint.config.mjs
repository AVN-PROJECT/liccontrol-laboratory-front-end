// eslint.config.mjs
// @ts-check

import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Отключаем все конфликтные с prettier правила
  eslintConfigPrettier,

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      ecmaFeatures: {
        jsx: true,
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
      complexity: ['error', { max: 10 }],
      'max-lines': ['error', 700],
      'no-alert': 'off',
      'no-console': 'off',
      'no-eval': 'error',
      'no-extend-native': 'off',
      'prefer-regex-literals': 'off',
      'import/no-webpack-loader-syntax': 'off',
      'no-else-return': 'off',
      'no-empty-function': 'error',
      'no-eq-null': 'error',
      'no-labels': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-loss-of-precision': 'error',
      'class-methods-use-this': 'off',
      'no-constructor-return': 'error',
      'no-promise-executor-return': 'error',
      'array-callback-return': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-invalid-this': 'off',
      'no-lone-blocks': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowTernary: true,
        },
      ],
      'no-unused-vars': 'off', // Отключено ради @typescript-eslint/no-unused-vars
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      radix: 'error',
      'require-await': 'off',
      'no-label-var': 'error',
      'no-undef-init': 'error',
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
        },
      ],
      'consistent-this': ['error', 'self'],
      'func-name-matching': 'error',
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'multiline-comment-style': ['error', 'separate-lines'],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: true,
          properties: false,
        },
      ],
      'no-array-constructor': 'error',
      'no-inline-comments': 'off',
      'no-lonely-if': 'off',
      'no-mixed-operators': 'off',
      'no-new-object': 'error',
      'no-unneeded-ternary': 'error',
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',

      // ==== VUE RULES ====
      'vue/html-indent': [
        'error',
        4,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/html-closing-bracket-newline': 'error',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
            normal: 'any',
            component: 'any',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          ignoreWhenEmpty: false,
          allowEmptyLines: true,
        },
      ],
      'vue/script-indent': [
        'error',
        4,
        {
          baseIndent: 0,
          switchCase: 1,
          ignores: [],
        },
      ],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/no-v-html': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-keys': 'off',
      'vue/padding-line-between-blocks': 2,
      'vue/new-line-between-multi-line-property': [
        'error',
        {
          minLineOfMultilineProperty: 2,
        },
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/no-lone-template': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/valid-attribute-name': 'off',
      'no-extra-semi': 'warn',

      // ==== PRETTIER ====
      'prettier/prettier': 'error',
    },
  },
];
