import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from '@yolostudio/ui/tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your 啊啊啊app!</Text>
        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
