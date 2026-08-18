module.exports = {
  preset: 'react-native',
  watchman: false,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|\\.pnpm)/)',
    'node_modules/\\.pnpm/(?!((jest-)?react-native|@react-native\\+(js-polyfills|virtualized-lists))@)',
  ],
  testMatch: ['<rootDir>/tests/**/*.test.ts?(x)'],
};
