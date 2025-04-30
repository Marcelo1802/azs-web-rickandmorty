import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

/**
 * Configuração do Apollo Client para conexão com a API GraphQL do Rick and Morty
 */
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client; 