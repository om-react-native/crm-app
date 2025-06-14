const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Simple alias for AsyncStorage compatibility
config.resolver.alias = {
  ...config.resolver.alias,
  '@react-native-community/async-storage': '@react-native-async-storage/async-storage',
};

module.exports = config; 