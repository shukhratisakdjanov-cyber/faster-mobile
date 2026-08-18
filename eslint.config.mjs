import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['lib/**', 'node_modules/**', '.artifacts/**'],
  },
  eslintConfigPrettier,
];
