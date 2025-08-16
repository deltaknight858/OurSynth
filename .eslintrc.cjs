module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
    'next/core-web-vitals', // Next.js specific rules
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'], // Point to your project's tsconfig.json
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'prettier',
  ],
  rules: {
    // General ESLint rules
    'no-unused-vars': 'off', // Handled by @typescript-eslint
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // TypeScript ESLint rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Often too strict for React components
    '@typescript-eslint/no-explicit-any': 'warn', // Warn about any, but allow for flexibility
    // React rules
    'react/react-in-jsx-scope': 'off', // Not needed for Next.js 13+
    'react/prop-types': 'off', // Not needed with TypeScript
    // Import rules
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // Prettier rules
    'prettier/prettier': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.next/',
    '.turbo/',
    'test-results/',
    '.studio/',
    '**/*.js', // Ignore JS files in TS projects, let TS handle them
  ],
};
