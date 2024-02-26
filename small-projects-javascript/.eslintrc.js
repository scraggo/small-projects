module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
//   overrides: [
//     {
//       env: {
//         node: true,
//       },
//       files: ['*/*.{js,cjs}'],
//       parserOptions: {
//         sourceType: 'script',
//       },
//     },
//   ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
};
