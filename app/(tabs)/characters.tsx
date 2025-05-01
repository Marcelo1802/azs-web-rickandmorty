import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_ALL_CHARACTERS, SEARCH_CHARACTERS_BY_NAME } from '../../services/queries';
import { CharactersResponse, Character } from '../../types/apiTypes';
import { CharacterCard } from '../../components/CharacterCard';
import { SearchBar } from '../../components/SearchBar';

/**
 * CharactersScreen - Tela que lista todos os personagens
 */
const CharactersScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Buscar todos os personagens
  const { loading: loadingAll, error: errorAll, data: allData, fetchMore: fetchMoreAll } = 
    useQuery<CharactersResponse>(GET_ALL_CHARACTERS, {
      variables: { page: 1 }
    });

  // Configurar query de busca para ser executada quando solicitado
  const [searchCharacters, { loading: loadingSearch, error: errorSearch, data: searchData, fetchMore: fetchMoreSearch }] = 
    useLazyQuery<CharactersResponse>(SEARCH_CHARACTERS_BY_NAME);

  // Atualizar a lista de personagens com base nos dados retornados
  useEffect(() => {
    if (searchTerm && searchData) {
      setCharacters(searchData.characters.results);
      setTotalPages(searchData.characters.info.pages);
      setCurrentPage(1);
    } else if (allData) {
      setCharacters(allData.characters.results);
      setTotalPages(allData.characters.info.pages);
      setCurrentPage(1);
    }
  }, [allData, searchData, searchTerm]);

  // Função para lidar com a pesquisa
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim()) {
      searchCharacters({ variables: { name: text, page: 1 } });
    }
  };

  // Carregar mais personagens quando chegar ao final da lista
  const loadMoreCharacters = () => {
    if (isLoadingMore || currentPage >= totalPages) return;
    
    const nextPage = currentPage + 1;
    setIsLoadingMore(true);
    
    const loadMore = async () => {
      try {
        if (searchTerm) {
          await fetchMoreSearch({
            variables: { name: searchTerm, page: nextPage },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                characters: {
                  ...fetchMoreResult.characters,
                  results: [
                    ...prev.characters.results,
                    ...fetchMoreResult.characters.results
                  ]
                }
              };
            }
          });
        } else {
          await fetchMoreAll({
            variables: { page: nextPage },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                characters: {
                  ...fetchMoreResult.characters,
                  results: [
                    ...prev.characters.results,
                    ...fetchMoreResult.characters.results
                  ]
                }
              };
            }
          });
        }
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Erro ao carregar mais personagens:', error);
      } finally {
        setIsLoadingMore(false);
      }
    };
    
    loadMore();
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard character={item} />
  );

  // Renderizar o indicador de carregamento no final da lista
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#62A4AB" />
        <Text style={styles.footerText}>Carregando mais personagens...</Text>
      </View>
    );
  };

  // Estado de carregamento combinado
  const isLoading = loadingAll || loadingSearch;
  
  // Estado de erro combinado
  const error = errorAll || errorSearch;

  // Determinar o conteúdo a ser exibido
  const renderContent = () => {
    if (isLoading && !isLoadingMore) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#62A4AB" />
          <Text style={styles.loadingText}>Carregando personagens...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar os personagens</Text>
          <Text style={styles.errorDetails}>{error.message}</Text>
        </View>
      );
    }

    if (characters.length === 0) {
      if (searchTerm) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum personagem encontrado para "{searchTerm}"
            </Text>
          </View>
        );
      }
      
      // Se não há personagens e não está pesquisando, pode ser que ainda não carregou
      if (!isLoading) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum personagem disponível. Tente novamente mais tarde.
            </Text>
          </View>
        );
      }
    }

    return (
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    );
  };

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: true,
        headerTitle: 'Rick and Morty - Personagens',
        headerStyle: { backgroundColor: '#121212' },
        headerTitleStyle: { color: '#FFFFFF' }
      }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Buscar personagem por nome..." 
        />
        
        {renderContent()}
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default CharactersScreen; 