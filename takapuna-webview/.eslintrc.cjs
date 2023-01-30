/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  'rules': {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
  'overrides': [
    {
      files: ['*.config.js'],
      env: {
        node: true,
      },
    },
  ],
};
