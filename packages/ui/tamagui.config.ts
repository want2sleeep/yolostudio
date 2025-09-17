import { createTamagui } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4'

const customConfig = createTamagui(defaultConfig);

export type AppConfig = typeof customConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default customConfig;
