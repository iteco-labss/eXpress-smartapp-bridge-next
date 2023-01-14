const isProd = process.env.NODE_ENV === 'production'
const warnDevErrorProd = isProd ? 2 : 1

module.exports = {
  env: {
    es6: true,
  },
  extends: [
    '@antfu',
  ],
  rules: {
    'no-console': ['warn'],
    // TODO: включить:
    // 'prefer-const': ['off'],
    // 'object-shorthand': ['warn', 'consistent-as-needed'],
    'curly': ['error', 'multi-line'],

    // 'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],

  },
}
