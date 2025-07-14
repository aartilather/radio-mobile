import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { usePlayer } from '../context/PlayerContext';
import { app } from '../firebase/config';

const db = getFirestore(app);

const HomeScreen = () => {
  const [stations, setStations] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'discover' | 'recent' | 'favorites'>('discover');
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 4 : 2;

  const {
    currentStation,
    playStation,
    isPlaying,
    isFavorite,
    toggleFavorite,
    favorites,
  } = usePlayer();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'stations'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
          //  console.log('Fetched from Firestore:', data);
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    fetchStations();
  }, []);

  const getFilteredData = () => {
    const filtered = stations.filter(station =>
      station.name.toLowerCase().includes(search.toLowerCase())
    );

    if (activeTab === 'favorites') {
      return filtered.filter(station => isFavorite(station));
    }

    // Add logic for 'recent' if you want
    return filtered;
  };

  const renderItem = ({ item }: { item: any }) => {
    const isCurrent = currentStation?.id === item.id;
    const fav = isFavorite(item);

    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.country}>{item.country}</Text>
          <Text style={styles.info}>Language: {item.language}</Text>
          <Text style={styles.info}>
            {item.codec} @ {item.bitrate} kbps
          </Text>
          <Text style={styles.info}>Votes: {item.votes}</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={22}
              color="#ff4081"
              style={{ marginBottom: 6 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => playStation(item)}>
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

  return (
    <View style={styles.container}>
      {/* Top Tab Navigation (No routing, just local state) */}
      <View style={styles.navRow}>
        <TouchableOpacity onPress={() => setActiveTab('discover')}>
          <Text style={[styles.navBtn, activeTab === 'discover' && styles.activeTab]}>
            Discover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('recent')}>
          <Text style={[styles.navBtn, activeTab === 'recent' && styles.activeTab]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('favorites')}>
          <Text style={[styles.navBtn, activeTab === 'favorites' && styles.activeTab]}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Stations
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search station..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={{ color: '#fff' }}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredData()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        columnWrapperStyle={styles.rowWrap}
        contentContainerStyle={{ paddingBottom: 0 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  navBtn: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTab: {
    color: '#00eaff',
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
  },
  searchBtn: {
    backgroundColor: '#0055ff',
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 12,
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowWrap: {
    justifyContent: 'space-between',
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
