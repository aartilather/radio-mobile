import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Station } from '../types/station'; // Make sure you have this type defined
import StationCard from '../components/StationCard'; // Reuse the same card UI
import TopNav from '../components/TopNav';
import { usePlayer } from '../context/PlayerContext';

const FavoritesScreen: React.FC = () => {
    const { favorites } = usePlayer();
    const [favoriteStations, setFavoriteStations] = useState<Station[]>([]);

    useEffect(() => {
        setFavoriteStations(favorites);
    }, [favorites]);

    return (
        <View style={styles.container}>
            <TopNav />
            <Text style={styles.heading}>❤️ Your Favorites</Text>
            {favoriteStations.length === 0 ? (
                <Text style={styles.empty}>No favorite stations yet.</Text>
            ) : (
                <FlatList
                    data={favoriteStations}
                    keyExtractor={(item) => item.id || item.name}
                    renderItem={({ item }) => <StationCard station={item} />}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0c0c',
        paddingHorizontal: 16,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16,
        marginBottom: 10,
    },
    empty: {
        color: '#aaa',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});
