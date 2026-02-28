const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      'coverage/**',
      'node_modules/**',
      'build/**',
      'src/models/__generated__/**',
      'src/global.d.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.js', '**/*.graphql'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      '@typescript-eslint/no-require-imports': 'off',
    },
  })),
  ...compat.extends('prettier'),
  {
    files: ['src/**/*.ts', 'src/**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.amd,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: require('eslint-plugin-import'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...require('eslint-plugin-prettier').configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 10 },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.test.js', '**/*.test.ts'],
    plugins: {
      jest: require('eslint-plugin-jest'),
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        fastify: 'readonly',
      },
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: require('@graphql-eslint/eslint-plugin'),
    },
    plugins: {
      '@graphql-eslint': require('@graphql-eslint/eslint-plugin'),
    },
    rules: {
      ...require('@graphql-eslint/eslint-plugin').configs['schema-recommended'].rules,
    },
  },
];
