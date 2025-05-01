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
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>Você ainda não tem episódios favoritos.</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item }) => <EpisodeCard episode={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});