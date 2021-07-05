import { RMovies, RChanges, RProviders, RKeywords, RVideos, RImages, RSimilarMovies, RCertifactions } from '../types/response';
import { MovieDetails } from '../types/type';
declare class Movies {
    apiKey: string;
    constructor(apiKey: string);
    /**
     * Discover movies  by different types of data like average rating, number of votes, genres and certifications.
     * @example discoverMovies( [{param:"page",value:"1"}])  *
     * @param {Array<Object>} query array of objects with properties param and value .
     * @returns {Promise} object with properties of {page,results,total_results,total_pages}
     */
    discoverMovies(query?: {
        param: string;
        value: string;
    }[]): Promise<RMovies>;
    movies(type: 'upcoming' | 'top_rated' | 'popular' | 'now_playing', page?: number): Promise<RMovies>;
    movie(id: number, args?: {
        getProviders?: boolean;
        append?: string[];
    }): Promise<MovieDetails>;
    /**
     * Get Videos related to the movies
     * @param id id of the movie
     * @returns Promise with object
     */
    getMovieVideos(id?: number): Promise<RVideos>;
    getSimilarMovies(id?: number, page?: number): Promise<RSimilarMovies>;
    /**
     * Get images of the movie or tv show by there ids
     * @example getImages(337404)
     * @param {number} id valid id of movie or tv
     * @returns {Promise} Promise containing object with properties : id,backdrops,posters
     */
    getMovieImages(id?: number): Promise<RImages>;
    /**
     * Get Providers list of movies
     * @param {number} id id of the movie
     * @param {number} page page number default:1
     * @returns {Promise} object with property id results
     */
    getMovieProvider(id: number, page?: number): Promise<RProviders>;
    /**
     * Get the changes occurred in  movie by there id
     * @example getChanges(337404)
     * @param {number} id id of the movie
     * @param {number} page page number
     * @returns {Promise} object with propert of change
     */
    getMovieChanges(id?: number, page?: number): Promise<RChanges>;
    /**
     * Get keywords related to the movie  there id
     * @example getKeywords(337404)
     * @param {number} id id of the movie or tv
     * @returns {Promise} object with property of id and results
     */
    getMovieKeywords(id?: number): Promise<RKeywords>;
    getMovieCertifications(): Promise<RCertifactions>;
}
export default Movies;
