module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018, // ES9
  },

  // Load aliases from webpack config
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.common.js',
      },
    },
  },

  extends: [
    'eslint:recommended',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-destructuring': 'off',
  },
  // Settings for TypeScript (.ts,) and Vue (*.vue) files.
  overrides: [{
    files: ['**/*.ts', '**/*.vue'],
    parserOptions: {
      // Parser for typescript.
      // See https://github.com/typescript-eslint/typescript-eslint/tree/b5a52a3aae85fce3bc45b39a2107a00d2655f5f9/packages/eslint-plugin#usage
      parser: '@typescript-eslint/parser',
      // Enable the project option to use rules which require type information.
      // Note that this may cause huge performance decreasing.
      // See https://github.com/typescript-eslint/typescript-eslint/blob/b5a52a3aae85fce3bc45b39a2107a00d2655f5f9/packages/parser/README.md#configuration
      project: './tsconfig.json',
    },

    plugins: ['@typescript-eslint', 'vue'],

    extends: [
      // Using @typescript-eslint/eslint-plugin rule set.
      // See https://github.com/typescript-eslint/typescript-eslint/tree/b5a52a3aae85fce3bc45b39a2107a00d2655f5f9/packages/eslint-plugin#usage
      'airbnb-base',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      // Using @vue/eslint-config-typescript rule set.
      // See https://github.com/vuejs/eslint-config-typescript/tree/166bc0de599f03435dca7fa4af8589d9b259bed5#vueeslint-config-typescript-1
      'plugin:vue/essential',
      '@vue/typescript',
    ],

    rules: {
      // Allow using function / lambda expression without explicit return types.
      '@typescript-eslint/explicit-function-return-type': ['warn', { 'allowExpressions': true }],
      // Allow using rest property to omit properties from objects.
      // See https://github.com/typescript-eslint/typescript-eslint/blob/3ddf1a2a0fb0b7863dee048913053f2c59f8283e/packages/eslint-plugin/docs/rules/no-unused-vars.md#ignorerestsiblings
      '@typescript-eslint/no-unused-vars': ['warn', { 'ignoreRestSiblings': true }],
      'prefer-destructuring': 'off',
      // Allow extension omittion when importing *.ts, *.js files
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
        },
      ],
    },
  }],
};
