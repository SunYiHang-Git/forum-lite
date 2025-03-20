import eslintJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import pluginImport from 'eslint-plugin-import'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default typescriptEslint.config(
  {
    ignores: ['dist', 'package-lock.json', 'src/assets'],
  },
  {
    files: ['**/*.js'],
    extends: [eslintJs.configs.recommended, pluginJsdoc.configs['flat/recommended']],
  },
  {
    files: ['**/*.{ts,vue}'],
    extends: [...typescriptEslint.configs.recommended, pluginJsdoc.configs['flat/recommended-typescript']],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    extends: pluginVue.configs['flat/recommended'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index', 'main'],
        },
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/require-default-prop': 'off',
    },
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': pluginSimpleImportSort,
      'plugin-import': pluginImport,
    },
    rules: {
      'no-var': 'error',
      'no-console': 'warn',
      'jsdoc/require-jsdoc': ['warn', { require: { ClassDeclaration: true }, enableFixer: false }],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': ['warn', { checkDestructured: false }],
      'jsdoc/check-param-names': ['warn', { checkDestructured: false }],
      'jsdoc/tag-lines': 'off',
      '@stylistic/line-comment-position': 'warn',
      '@stylistic/spaced-comment': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'plugin-import/first': 'warn',
      'plugin-import/newline-after-import': 'warn',
      'plugin-import/no-duplicates': 'warn',
    },
  },
  eslintPluginPrettierRecommended,
)
