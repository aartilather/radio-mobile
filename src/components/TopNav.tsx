import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopNav: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎧 Global Radio</Text>
            <View style={styles.navLinks}>
                <TouchableOpacity onPress={() => navigation.navigate('Recents')}>
                    <Text style={styles.link}>Recents</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <Text style={styles.link}>Favorites</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopNav;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#00FFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    navLinks: {
        flexDirection: 'row',
        gap: 16,
    },
    link: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 16,
    },
});
