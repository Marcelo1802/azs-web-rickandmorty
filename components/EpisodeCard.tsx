import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Episode } from '../types/apiTypes';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesContext';

type EpisodeCardProps = {
  episode: Episode;
};

/**
 * Componente que exibe informações de um episódio em um card
 */
export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === episode.id);

  const handlePress = () => {
    router.push({
      pathname: "/episode/[id]",
      params: { id: episode.id }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.episodeInfo}>
        <Text style={styles.episodeCode}>{episode.episode}</Text>
        <Text style={styles.airDate}>{episode.air_date}</Text>
      </View>
      <Text style={styles.title}>{episode.name}</Text>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => toggleFavorite(episode)} style={styles.favoriteButton}>
          <MaterialIcons name="favorite" size={24} color={isFavorite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  episodeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  episodeCode: {
    color: '#62A4AB',
    fontSize: 14,
    fontWeight: '600',
  },
  airDate: {
    color: '#999',
    fontSize: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  favoriteButton: {
    // Remover a posição absoluta para alinhar na parte inferior
  },
}); 