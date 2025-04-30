import { gql } from '@apollo/client';

/**
 * Query para obter todos os episódios com seus dados básicos
 */
export const GET_ALL_EPISODES = gql`
  query GetAllEpisodes {
    episodes {
      results {
        id
        name
        air_date
        episode
        created
      }
      info {
        count
        pages
      }
    }
  }
`;

/**
 * Query para buscar episódios pelo nome
 */
export const SEARCH_EPISODES_BY_NAME = gql`
  query SearchEpisodesByName($name: String!) {
    episodes(filter: { name: $name }) {
      results {
        id
        name
        air_date
        episode
        created
      }
      info {
        count
        pages
      }
    }
  }
`;

/**
 * Query para obter um episódio específico por ID
 */
export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        species
        image
      }
      created
    }
  }
`; 