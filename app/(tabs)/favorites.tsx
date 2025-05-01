import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { useFavorites } from '../../components/FavoritesContext';
import { EpisodeCard } from '../../components/EpisodeCard';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Favoritos', headerStyle: { backgroundColor: '#121212' }, headerTitleStyle: { color: '#FFFFFF' } }} />
      <SafeAreaView style={styles.container}>
        {favorites.length === 0 ? (
          <Text style={styles.text}>Você ainda não tem episódios favoritos.</Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item }) => <EpisodeCard episode={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});