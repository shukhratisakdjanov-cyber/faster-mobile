const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const storybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [path.resolve(__dirname, '../..')],
};

const metroConfig = mergeConfig(getDefaultConfig(__dirname), config);

if (storybookEnabled) {
  const storybookEntry = path.resolve(__dirname, '.rnstorybook/index.ts');
  const resolveRequest = metroConfig.resolver?.resolveRequest;

  metroConfig.resolver = {
    ...metroConfig.resolver,
    resolveRequest(context, moduleName, platform) {
      if (moduleName === './App') {
        return {filePath: storybookEntry, type: 'sourceFile'};
      }

      return resolveRequest?.(context, moduleName, platform)
        ?? context.resolveRequest(context, moduleName, platform);
    },
  };
}

module.exports = withStorybook(metroConfig, {enabled: storybookEnabled});
