import TMDB from './TMDB';
import { RKeywords, RReviews, RVideos, RImages, RSimilar, MovieAndTv } from '../types/response';
declare class Details extends TMDB {
    apiKey: string;
    constructor(apiKey: string);
    getConfigs(): Promise<any>;
    getConfig(config: 'jobs' | 'countries' | 'languages' | 'primary_translations' | 'timezones'): Promise<any>;
    findByExternalId(externalId: string, externalSource: 'imdb_id' | 'freebase_mid' | 'freebase_id' | 'tvdb_id' | 'tvrage_id' | 'facebook_id' | 'twitter_id' | 'instagram_id'): Promise<any>;
    getTrending(mediaType?: 'all' | 'movie' | 'tv' | 'person', timeWindow?: 'week' | 'day'): Promise<any>;
    getCredits(creditId: string): Promise<any>;
    getVideos(type?: 'movie' | 'tv', id?: number): Promise<RVideos>;
    getSimilar(type: 'movie' | 'tv', id: number, page?: number): Promise<RSimilar>;
    /**
     * Get images of the movie or tv show by there ids
     * @example getImages("movie",337404)
     * @param {string} type movie or tv default:movie
     * @param {number} id valid id of movie or tv
     * @returns {Promise} Promise containing object with properties : id,backdrops,posters
     */
    getImages(type?: string, id?: number): Promise<RImages>;
    /**
     * Get the details about the movie or tv by there id
     * @example getDetail({
     *        type:"movie",
     * id:3337404,
     * page:1,
     * detail:"recommendations"
     * })
     * @returns {Promise} Objects with results
     */
    getDetails(args: {
        type: 'movie' | 'tv';
        id: number;
        page?: number;
        detail: 'recommendations' | 'videos' | 'images' | 'reviews' | 'credits' | 'changes' | 'lists' | 'keywords' | 'changes' | 'external_ids' | 'similar' | 'translations' | 'content_ratings' | 'episode_groups' | 'screened_theatrically' | 'alternative_titles' | 'account_states' | 'release_dates';
    }): Promise<any>;
    /**
     * Get keywords related to the movie or tv by there id
     * @example getKeywords("movie",337404)
     * @param {string} type movie or tv default:movie
     * @param {number} id id of the movie or tv
     * @returns {Promise} object with property of id and results
     */
    getKeywords(type?: 'movie' | 'tv', id?: number): Promise<RKeywords>;
    /**
     *  Get genres of the movie or tv
     * @example getGenres("movie")
     * @param {string} type - movie or tv default:movie
     * @returns {Promise} Promise containing object of genres list with there ids
     */
    getGenres(type?: 'movie' | 'tv'): Promise<{
        genres: {
            id: number;
            name: string;
        }[];
    }>;
    /**
     * Get Reviews of the movie or tv as per there id
     * @example getReviews("movie",337404)
     * @param {string} type movie or tv default:movie
     * @param {Number} id id of the movie or tv
     * @returns {Promise} Object with {id, page, result, total_pages, total_results,}
     */
    getReviews(type: 'movie' | 'tv', id: number, page?: number): Promise<RReviews>;
    /**
     * Search for the movie or tv show by there title
     * @example search({type:"movie",query:"avengers",page:1})
     * @param {object} args type:"movie",query:"avengers",page:1
     * @param {string} args.type - movie or tv
     * @param {string} args.query - name of the movie or tv show
     * @param {number} args.page - page number
     *
     * @returns {Promise} Promise containing object with properties page, results, total_pages, and total_results
     *
     */
    search(args: {
        type: 'movie' | 'tv';
        query: string;
        page?: number;
    }): Promise<{
        id: number;
        page: number;
        results: MovieAndTv[];
        total_pages: number;
        total_results: number;
    }>;
}
export default Details;
