export default function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin', 
        {        
          components: ['@tamagui/core', '@tamagui/react-native'],
          config: './tamagui.config.ts',
        }
      ],
      'transform-react-remove-prop-types',
    ],
  };
};