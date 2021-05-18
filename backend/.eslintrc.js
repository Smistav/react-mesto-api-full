module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // 'max-len': ['error', 100, 2, { ignoreUrls: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
