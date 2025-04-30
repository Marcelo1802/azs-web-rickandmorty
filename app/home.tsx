import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_ALL_EPISODES, SEARCH_EPISODES_BY_NAME } from '../services/queries';
import { EpisodesResponse, Episode } from '../types/apiTypes';
import { EpisodeCard } from '../components/EpisodeCard';
import { SearchBar } from '../components/SearchBar';

/**
 * HomeScreen - Tela principal que lista todos os episódios
 */
const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  // Buscar todos os episódios
  const { loading: loadingAll, error: errorAll, data: allData } = useQuery<EpisodesResponse>(GET_ALL_EPISODES);

  // Configurar query de busca para ser executada quando solicitado
  const [searchEpisodes, { loading: loadingSearch, error: errorSearch, data: searchData }] = 
    useLazyQuery<EpisodesResponse>(SEARCH_EPISODES_BY_NAME);

  // Atualizar a lista de episódios com base nos dados retornados
  useEffect(() => {
    if (searchTerm && searchData) {
      setEpisodes(searchData.episodes.results);
    } else if (allData) {
      setEpisodes(allData.episodes.results);
    }
  }, [allData, searchData, searchTerm]);

  // Função para lidar com a pesquisa
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim()) {
      searchEpisodes({ variables: { name: text } });
    }
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }: { item: Episode }) => (
    <EpisodeCard episode={item} />
  );

  // Estado de carregamento combinado
  const isLoading = loadingAll || loadingSearch;
  
  // Estado de erro combinado
  const error = errorAll || errorSearch;

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
        
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Buscar episódio por nome..." 
        />
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#62A4AB" />
            <Text style={styles.loadingText}>Carregando episódios...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar os episódios</Text>
            <Text style={styles.errorDetails}>{error.message}</Text>
          </View>
        ) : episodes.length === 0 && searchTerm ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum episódio encontrado para "{searchTerm}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={episodes}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
});

export default HomeScreen; 