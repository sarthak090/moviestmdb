export interface RMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
export interface RTvShow {
    page: number;
    results: Tv[];
    total_pages: number;
    total_results: number;
}
export interface RCertifactions {
    certifications: {
        [key: string]: {
            certification: string;
            meaning: string;
            order: number;
        }[];
    };
}
export interface RTranslations {
    translations: Translations[];
}
export interface RCredits {
    cast: Cast[];
    crew: Crew[];
}
export interface RReviews {
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}
export interface RExternalId {
    imdb_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
}
export interface RLists {
    page: number;
    results: List[];
    total_pages: number;
    total_results: number;
}
export interface RRecommendations {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
export interface RKeywords {
    id?: number;
    keywords: {
        id: number;
        name: string;
    }[];
}
export interface RTitles {
    titles: {
        iso_3166_1: string;
        title: string;
        type: string;
    }[];
}
export interface RVideos {
    results: {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        site: string;
        size: number;
        type: string;
    }[];
}
export interface RChanges {
    changes: {
        key: string;
        items: {
            id: number;
            action: string;
            time: string;
        }[];
    }[];
}
export interface RProviders {
    id: number;
    results: {
        [key: string]: Provider;
    };
}
export interface Provider {
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
}
export interface RImages {
    id?: number;
    backdrops: Img[];
    logos?: Img[];
    posters: Img[];
}
export interface Img {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}
export interface RRelaseDates {
    results: {
        iso_3166_1: string;
        release_dates: [
            {
                certification: string;
                iso_639_1: string;
                note: string;
                release_date: string;
                type: number;
            }
        ];
    }[];
}
export interface RSimilar {
    page: number;
    results: MovieAndTv[];
    total_pages: number;
    total_results: number;
}
export declare type MovieAndTv = {
    backdrop_path: null | string;
    genre_ids: [number];
    id: number;
    name?: string;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    title?: string;
    original_title?: string;
    release_date?: string;
    adult: boolean;
    video?: boolean | string;
    origin_country?: [string];
    original_name?: string;
    first_air_date?: string;
};
export interface RSimilarMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
export interface RSimilarTV {
    page: number;
    results: Tv[];
    total_pages: number;
    total_results: number;
}
export interface RErr {
    status: number;
    msg: string;
}
export interface RProvider {
    id: number;
    results: {
        [key: string]: Provider;
    };
}
declare type List = {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null | string;
};
declare type Review = {
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
};
export declare type Cast = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};
export declare type Tv = {
    adult: boolean;
    backdrop_path: null | string;
    first_air_date: string;
    genre_ids: [number];
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
};
export declare type Movie = {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: [number];
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date?: string;
    video: boolean | string;
    vote_average: number;
    vote_count: number;
};
export declare type Crew = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
};
declare type Translations = {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
        homepage: string;
        overview: string;
        runtime: number;
        tagline: string;
        title: string;
    };
};
export {};
