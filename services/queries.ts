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

/**
 * Query para obter personagens com paginação
 */
export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        created
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

/**
 * Query para buscar personagens pelo nome
 */
export const SEARCH_CHARACTERS_BY_NAME = gql`
  query SearchCharactersByName($name: String!, $page: Int) {
    characters(filter: { name: $name }, page: $page) {
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        created
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;