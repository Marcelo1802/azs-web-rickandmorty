import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useQuery } from '@apollo/client';

import { GET_EPISODE } from '../../services/queries';
import { EpisodeResponse, Character } from '../../types/apiTypes';

/**
 * Componente para exibir um cartão de personagem
 */
const CharacterCard = ({ character }: { character: Character }) => (
  <View style={styles.characterCard}>
    <Image 
      source={{ uri: character.image }} 
      style={styles.characterImage} 
      resizeMode="cover"
    />
    <View style={styles.characterInfo}>
      <Text style={styles.characterName}>{character.name}</Text>
      <View style={styles.characterDetails}>
        <Text style={[
          styles.characterStatus, 
          { color: character.status === 'Alive' ? '#55CC44' : character.status === 'Dead' ? '#D63D2E' : '#9E9E9E' }
        ]}>
          {character.status}
        </Text>
        <Text style={styles.characterSpecies}>{character.species}</Text>
      </View>
    </View>
  </View>
);

/**
 * Tela de detalhes de um episódio específico
 */
const EpisodeDetails = () => {
  // Obter o ID do episódio da URL
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Buscar os dados do episódio
  const { loading, error, data } = useQuery<EpisodeResponse>(GET_EPISODE, {
    variables: { id },
  });

  // Renderizar cada personagem
  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard character={item} />
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerTitle: data?.episode?.name || 'Detalhes do Episódio',
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { color: '#FFFFFF' }
        }} 
      />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#62A4AB" />
            <Text style={styles.loadingText}>Carregando detalhes...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar os detalhes</Text>
            <Text style={styles.errorDetails}>{error.message}</Text>
          </View>
        ) : data?.episode ? (
          <View style={styles.content}>
            <View style={styles.episodeHeader}>
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeCode}>{data.episode.episode}</Text>
                <Text style={styles.airDate}>Exibido em: {data.episode.air_date}</Text>
              </View>
              <Text style={styles.episodeTitle}>{data.episode.name}</Text>
            </View>
            
            <View style={styles.charactersHeader}>
              <Text style={styles.charactersTitle}>Personagens</Text>
              <Text style={styles.charactersCount}>
                {data.episode.characters.length} {data.episode.characters.length === 1 ? 'personagem' : 'personagens'}
              </Text>
            </View>
            
            <FlatList
              data={data.episode.characters}
              renderItem={renderCharacter}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.charactersList}
            />
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Episódio não encontrado</Text>
          </View>
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
  content: {
    flex: 1,
  },
  episodeHeader: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  episodeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  episodeCode: {
    color: '#62A4AB',
    fontSize: 16,
    fontWeight: '600',
  },
  airDate: {
    color: '#999999',
    fontSize: 14,
  },
  episodeTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  charactersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  charactersTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  charactersCount: {
    color: '#999999',
    fontSize: 14,
  },
  charactersList: {
    padding: 16,
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  characterImage: {
    width: 100,
    height: 100,
  },
  characterInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  characterName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  characterDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterStatus: {
    fontSize: 14,
    marginRight: 8,
  },
  characterSpecies: {
    color: '#BBBBBB',
    fontSize: 14,
  },
});

export default EpisodeDetails; 