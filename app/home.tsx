import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useQuery } from '@apollo/client';

import { GET_ALL_EPISODES } from '../services/queries';
import { EpisodesResponse, Episode } from '../types/apiTypes';
import { EpisodeCard } from '../components/EpisodeCard';

/**
 * HomeScreen - Tela principal que lista todos os episódios
 */
const HomeScreen = () => {
  // Buscar os dados dos episódios
  const { loading, error, data } = useQuery<EpisodesResponse>(GET_ALL_EPISODES);

  // Função para renderizar cada item da lista
  const renderItem = ({ item }: { item: Episode }) => (
    <EpisodeCard episode={item} />
  );

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: true,
        headerTitle: 'Rick and Morty - Episódios',
        headerStyle: { backgroundColor: '#121212' },
        headerTitleStyle: { color: '#FFFFFF' }
      }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#62A4AB" />
            <Text style={styles.loadingText}>Carregando episódios...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar os episódios</Text>
            <Text style={styles.errorDetails}>{error.message}</Text>
          </View>
        ) : (
          <FlatList
            data={data?.episodes.results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5252',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
});

export default HomeScreen; 