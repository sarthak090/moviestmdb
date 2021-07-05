import Movies from './Movies';
import { RTvShow, RChanges, RProviders, RKeywords, RImages, RSimilarTV, RCertifactions } from '../types/response';
import { TVDetails } from '../types/type';
declare class TV extends Movies {
    apiKey: string;
    constructor(apiKey: string);
    discoverTv(query?: {
        param: string;
        value: string;
    }[]): Promise<RTvShow>;
    tv(id: number, args?: {
        getProviders?: boolean;
        append?: string[];
    }): Promise<TVDetails>;
    tvShows(type: 'top_rated' | 'popular' | 'on_the_air' | 'airing_today', page?: number | 1): Promise<RTvShow>;
    getSimilarTv(id?: number, page?: number): Promise<RSimilarTV>;
    /**
     * Get images of the  tv show by there ids
     * @example getImages(337404)
     * @param {number} id valid id of  tv
     * @returns {Promise} Promise containing object with properties : id,backdrops,posters
     */
    getTVImages(id?: number): Promise<RImages>;
    /**
     * Get Providers list of tv show
     * @param {number} id id of the tv
     * @param {number} page page number default:1
     * @returns {Promise} object with property id results
     */
    getTvProvider(id: number, page?: number): Promise<RProviders>;
    /**
     * Get the changes occurred in  tv by there id
     * @example getChanges(337404)
     * @param {number} id id of the tv
     * @param {number} page page number
     * @returns {Promise} object with propert of change
     */
    getTvChanges(id?: number, page?: number): Promise<RChanges>;
    /**
     * Get keywords related to the  tv by there id
     * @example getKeywords(337404)
     * @param {number} id id of the movie or tv
     * @returns {Promise} object with property of id and results
     */
    getTvKeywords(id?: number): Promise<RKeywords>;
    getTvCertifications(): Promise<RCertifactions>;
    getTvSeason(id: number, seasonNumber: number): Promise<any>;
    getTvSeasonDetail(id: number, seasonNumber: number, detail: 'account_states' | 'aggregate_credits' | 'changes' | 'credits' | 'external_ids' | 'images' | 'translations' | 'videos'): Promise<any>;
    getTVEpisodes(id: number, seasonNumber: number, episodeNumber: number): Promise<any>;
    getTvEpisodeDetail(id: number, seasonNumber: number, episodeNumber: number, detail: 'account_states' | 'aggregate_credits' | 'changes' | 'credits' | 'external_ids' | 'images' | 'translations' | 'videos'): Promise<any>;
    getTvEpisodeGroup(id: number): Promise<any>;
}
export default TV;
