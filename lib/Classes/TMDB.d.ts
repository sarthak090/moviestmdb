import TV from './TV';
declare class TMDB extends TV {
    apiKey: string;
    constructor(apiKey: string);
    /**
     * Discover movie or tv by different types of data like average rating, number of votes, genres and certifications.
     * @example discover("movie",[{param:"page",value:2}])
     * @param {string} [type=movie] movie or tv default:movie
     * @param {Array} args arguments such as sort_by page etc default:[]
     * @returns {Promise} object with properties of {page,results,total_results,total_pages}
     */
    discover(type?: 'movie' | 'tv', query?: {
        param: string;
        value: string;
    }[]): Promise<any>;
}
export default TMDB;
