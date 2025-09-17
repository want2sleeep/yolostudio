import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  transpilePackages: [
    "react-native-web",
    "@yolostudio/ui",
    "@yolostudio/utils",
    "@tamagui/core",
    "@tamagui/react-native",
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    return config;
  }
};

export default nextConfig;
