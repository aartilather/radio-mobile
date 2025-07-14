import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Station } from '../types/station';
import { usePlayer } from '../context/PlayerContext';

const StationCard = ({ station }: { station: Station }) => {
  const { currentStation, playStation, isPlaying, isFavorite, toggleFavorite } = usePlayer();
  const isCurrent = currentStation?.id === station.id;
  const fav = isFavorite(station);

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{station.name}</Text>
        <Text style={styles.country}>{station.country}</Text>
        <Text style={styles.info}>Language: {station.language}</Text>
        <Text style={styles.info}>
          {station.codec} @ {station.bitrate} kbps
        </Text>
        <Text style={styles.info}>Votes: {station.votes}</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => toggleFavorite(station)}>
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={22}
            color="#ff4081"
            style={{ marginBottom: 6 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => playStation(station)}>
          <Ionicons
            name={isCurrent && isPlaying ? 'pause-circle' : 'play-circle'}
            size={32}
            color={isCurrent ? '#00eaff' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    flex: 1,
  },
  title: {
    color: '#00eaff',
    fontSize: 16,
    fontWeight: '600',
  },
  country: {
    color: '#fff',
    fontSize: 14,
  },
  info: {
    color: '#ccc',
    fontSize: 12,
  },
});
