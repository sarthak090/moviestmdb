import {
  RTranslations,
  RCredits,
  RReviews,
  RTitles,
  RExternalId,
  RKeywords,
  RLists,
  RRecommendations,
  RRelaseDates,
  RSimilarTV,
  RVideos,
  RImages,
  RProvider,
  RSimilarMovies,
  Cast,
  Crew,
} from './response';
export declare type TVDetails = {
  adult?: boolean;
  backdrop_path: null | string;
  first_air_date: string;
  id: number;
  name: string;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: null | string;
  }[];
  episode_run_time: [number];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: [string];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  next_episode_to_air: null;
  networks: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompanies[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: Season[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  videos?: RVideos;
  images?: RImages;
  translations?: RTranslations;
  credits?: RCredits;
  providers: RProvider;
  reviews?: RReviews;
  alternative_titles?: RTitles;
  external_ids?: RExternalId;
  keywords?: RKeywordsTV;
  lists?: RLists;
  recommendations?: RRecommendations;
  release_dates?: RRelaseDates;
  similar?: RSimilarTV;
  screened_theatrically?: {
    id: number;
    results: {
      id: number;
      episode_number: number;
      season_number: number;
    }[];
  }[];
};
export declare type MovieDetails = {
  adult: boolean;
  title: string;
  runtime: string;
  backdrop_path: null | string;
  belongs_to_collection: BelongToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  tagline: string;
  videos?: RVideos;
  images?: RImages;
  translations?: RTranslations;
  credits?: RCredits;
  providers: IProvider;
  reviews?: RReviews;
  alternative_titles?: RTitles;
  external_ids?: RExternalId;
  keywords?: RKeywords;
  lists?: RLists;
  recommendations?: RRecommendations;
  release_dates?: RRelaseDates;
  similar?: RSimilarMovies;
  cast: {
    cast: Cast[];
    crew: Crew[];
  };
};
declare type BelongToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path?: string;
};
interface RKeywordsTV {
  results: {
    id: number;
    name: string;
  }[];
}
interface IProvider {
  id: number;
  results: {
    [key: string]: Provider;
  };
}
declare type Provider = {
  link: string;
  buy?: {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
  rent?: {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
  flatrate: {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
};
declare type ProductionCompanies = {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
};
declare type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};
declare type Genre = {
  id: number;
  name: string;
};
export {};
