// ✅ src/screens/RecentsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import StationCard from '../components/StationCard';
import { Station } from '../types/station';

const RecentsScreen: React.FC = () => {
  const [recentStations, setRecentStations] = useState<Station[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('recentStations');
    if (data) {
      setRecentStations(JSON.parse(data));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>
      {recentStations.length === 0 ? (
        <Text>No recently played stations.</Text>
      ) : (
        <FlatList
          data={recentStations}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <StationCard station={item} />}
        />
      )}
    </View>
  );
};

export default RecentsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
});