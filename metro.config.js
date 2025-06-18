// metro.config.js

const { getDefaultConfig } = require('@expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

// Create base config
const config = getDefaultConfig(__dirname);

// Optional: block test files from Metro bundler
config.resolver.blockList = [/(.*\.test\.tsx?)$/];

// Optional: alias (if needed)
// config.resolver.alias = {
//   'storybook/actions': require.resolve('@storybook/addon-actions'),
// };

// Export config wrapped with Storybook
module.exports = withStorybook(config);
