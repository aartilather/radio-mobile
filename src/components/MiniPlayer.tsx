import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePlayer } from '../context/PlayerContext';

const MiniPlayer: React.FC = () => {
  const { currentStation, isPlaying, togglePlayback } = usePlayer();
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load and manage audio playback
  useEffect(() => {
    const loadAudio = async () => {
      if (!currentStation?.url_resolved) return;

      try {
        // Unload previous audio if any
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri: currentStation.url_resolved },
          { shouldPlay: isPlaying }
        );

        soundRef.current = sound;

        if (!isPlaying) {
          await sound.pauseAsync();
        }
      } catch (error) {
        console.log('Audio load error:', error);
      }
    };

    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentStation]);

  useEffect(() => {
    const controlAudio = async () => {
      if (!soundRef.current) return;

      if (isPlaying) {
        await soundRef.current.playAsync();
      } else {
        await soundRef.current.pauseAsync();
      }
    };

    controlAudio();
  }, [isPlaying]);

  if (!currentStation) return null;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{currentStation.name}</Text>
        <Text style={styles.country}>{currentStation.country}</Text>
      </View>

      <TouchableOpacity onPress={togglePlayback} style={styles.button}>
        <Entypo
          name={isPlaying ? 'controller-paus' : 'controller-play'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1f1f1f',
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  name: {
    color: '#00e0ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  country: {
    color: '#ccc',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 25,
  },
});
