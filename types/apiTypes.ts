/**
 * Interface para o episódio
 */
export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string; // Formato: S01E01
  created: string;
}

/**
 * Interface para informações de paginação
 */
export interface PaginationInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

/**
 * Interface para a resposta da query de episódios
 */
export interface EpisodesResponse {
  episodes: {
    results: Episode[];
    info: PaginationInfo;
  };
}

/**
 * Interface para personagem
 */
export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender?: string;
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
  image: string;
  created?: string;
}

/**
 * Interface para a resposta da query de um episódio específico
 */
export interface EpisodeResponse {
  episode: Episode & {
    characters: Character[];
  };
}

/**
 * Interface para a resposta da query de personagens
 */
export interface CharactersResponse {
  characters: {
    results: Character[];
    info: PaginationInfo;
  };
} 