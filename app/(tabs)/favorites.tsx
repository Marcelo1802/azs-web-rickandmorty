import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useFavorites } from '../../components/FavoritesContext';
import { EpisodeCard } from '../../components/EpisodeCard';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  // Componente para a imagem estilizada como card
  const AZShipCard = () => (
    <View style={styles.imageCard}>
      <View style={styles.imageHeader}>
        <Text style={styles.imageHeaderText}>AZShip</Text>
        <Text style={styles.imageDate}>Episódio Especial</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/AZShip-favorites-ep.jpg')}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.imageTitle}>Rick and Morty - AZShip Favoritos</Text>
    </View>
  );

  const renderContent = () => {
    if (favorites.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <AZShipCard />
          <Text style={styles.text}>Você ainda não tem episódios favoritos.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={favorites}
        renderItem={({ item }) => <EpisodeCard episode={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={<AZShipCard />}
      />
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Favoritos', headerStyle: { backgroundColor: '#121212' }, headerTitleStyle: { color: '#FFFFFF' } }} />
      <SafeAreaView style={styles.container}>
        {renderContent()}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  text: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  imageCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: 'hidden',
  },
  imageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  imageHeaderText: {
    color: '#62A4AB',
    fontSize: 14,
    fontWeight: '600',
  },
  imageDate: {
    color: '#999',
    fontSize: 14,
  },
  imageContainer: {
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cardImage: {
    width: width - 64,
    height: 250,
  },
  imageTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    paddingTop: 8,
  },
});