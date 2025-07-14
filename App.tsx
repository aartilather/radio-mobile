import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import MiniPlayer from './src/components/MiniPlayer';
import { PlayerProvider } from './src/context/PlayerContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const isWeb = Platform.OS === 'web';

  return (
    <PlayerProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HomeScreen />
        <MiniPlayer />
      </View>
    </PlayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS === 'web' ? 80 : 100, // extra space for MiniPlayer
    backgroundColor: '#000',
  },
});
