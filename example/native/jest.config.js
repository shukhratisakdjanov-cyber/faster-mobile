module.exports = {
  preset: 'react-native',
  watchman: false,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@shukhratisakdjanov-cyber/faster-mobile|\\.pnpm)/)',
    'node_modules/\\.pnpm/(?!((jest-)?react-native|@react-native\\+(js-polyfills|virtualized-lists)|@shukhratisakdjanov-cyber\\+faster-mobile)@)',
  ],
};
