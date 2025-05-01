import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Character } from '../types/apiTypes';

type CharacterCardProps = {
  character: Character;
  onPress?: () => void;
};

/**
 * Componente que exibe informações de um personagem em um card
 */
export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#55CC44';
      case 'dead':
        return '#D63D2E';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!onPress}>
      <Image 
        source={{ uri: character.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{character.name}</Text>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(character.status) }]} />
          <Text style={styles.statusText}>
            {character.status} - {character.species}
          </Text>
        </View>
        
        {character.origin && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Origem:</Text>
            <Text style={styles.detailValue}>{character.origin.name}</Text>
          </View>
        )}
        
        {character.location && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Localização:</Text>
            <Text style={styles.detailValue}>{character.location.name}</Text>
          </View>
        )}
        
        {character.gender && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gênero:</Text>
            <Text style={styles.detailValue}>{character.gender}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 160,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  detailLabel: {
    color: '#999999',
    fontSize: 14,
    marginRight: 4,
  },
  detailValue: {
    color: '#DDDDDD',
    fontSize: 14,
    flex: 1,
  },
}); 