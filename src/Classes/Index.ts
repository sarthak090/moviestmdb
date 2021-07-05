import TMDB from './TMDB';
import request from '../utils/request';
import { RKeywords, RReviews, RVideos, RImages, RSimilar, MovieAndTv } from '../types/response';

class Details extends TMDB {
  constructor(public apiKey: string) {
    super(apiKey);
  }
  async getConfigs() {
    return request(`https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}`);
  }

  async getConfig(config: 'jobs' | 'countries' | 'languages' | 'primary_translations' | 'timezones') {
    return request(`https://api.themoviedb.org/3/configuration/${config}?api_key=${this.apiKey}`);
  }
  async findByExternalId(
    externalId: string,
    externalSource:
      | 'imdb_id'
      | 'freebase_mid'
      | 'freebase_id'
      | 'tvdb_id'
      | 'tvrage_id'
      | 'facebook_id'
      | 'twitter_id'
      | 'instagram_id',
  ) {
    return request(
      `https://api.themoviedb.org/3/find/${externalId}?api_key=${this.apiKey}&language=en-US&external_source=${externalSource}`,
    );
  }
  async getTrending(mediaType: 'all' | 'movie' | 'tv' | 'person' = 'all', timeWindow: 'week' | 'day' = 'day') {
    return request(`https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=${this.apiKey}`);
  }
  async getCredits(creditId: string) {
    return request(`https://api.themoviedb.org/3/credit/${creditId}?api_key=${this.apiKey}`);
  }
  async getVideos(type: 'movie' | 'tv' = 'movie', id: number = 0): Promise<RVideos> {
    return request(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${this.apiKey}`);
  }
  async getSimilar(type: 'movie' | 'tv', id: number, page: number = 1): Promise<RSimilar> {
    return request(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get images of the movie or tv show by there ids
   * @example getImages("movie",337404)
   * @param {string} type movie or tv default:movie
   * @param {number} id valid id of movie or tv
   * @returns {Promise} Promise containing object with properties : id,backdrops,posters
   */
  async getImages(type = 'movie', id = 0): Promise<RImages> {
    return request(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${this.apiKey}`);
  }

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
  async getDetails(args: {
    type: 'movie' | 'tv';
    id: number;
    page?: number;
    detail:
      | 'recommendations'
      | 'videos'
      | 'images'
      | 'reviews'
      | 'credits'
      | 'changes'
      | 'lists'
      | 'keywords'
      | 'changes'
      | 'external_ids'
      | 'similar'
      | 'translations'
      | 'content_ratings'
      | 'episode_groups'
      | 'screened_theatrically'
      | 'alternative_titles'
      | 'account_states'
      | 'release_dates';
  }) {
    const query = {
      type: args.type ? args.type : 'movie',
      id: args.id ? args.id : 337404,
      page: args.page ? args.page : 1,
      detail: args.detail ? args.detail : 'recommendations',
    };
    const url = `https://api.themoviedb.org/3/${query.type}/${query.id}/${query.detail}?api_key=${this.apiKey}&page=${query.page}`;
    return request(url);
  }
  /**
   * Get keywords related to the movie or tv by there id
   * @example getKeywords("movie",337404)
   * @param {string} type movie or tv default:movie
   * @param {number} id id of the movie or tv
   * @returns {Promise} object with property of id and results
   */
  async getKeywords(type: 'movie' | 'tv' = 'movie', id: number = 0): Promise<RKeywords> {
    return request(`https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=${this.apiKey}`);
  }
  /**
   *  Get genres of the movie or tv
   * @example getGenres("movie")
   * @param {string} type - movie or tv default:movie
   * @returns {Promise} Promise containing object of genres list with there ids
   */

  async getGenres(type: 'movie' | 'tv' = 'movie'): Promise<{
    genres: {
      id: number;
      name: string;
    }[];
  }> {
    return request(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${this.apiKey}&language=en-US`);
  }
  /**
   * Get Reviews of the movie or tv as per there id
   * @example getReviews("movie",337404)
   * @param {string} type movie or tv default:movie
   * @param {Number} id id of the movie or tv
   * @returns {Promise} Object with {id, page, result, total_pages, total_results,}
   */
  getReviews(type: 'movie' | 'tv', id: number, page: number = 1): Promise<RReviews> {
    const url = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${this.apiKey}&page=${page}`;

    return request(url);
  }
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
  async search(args: { type: 'movie' | 'tv'; query: string; page?: number }): Promise<{
    id: number;
    page: number;
    results: MovieAndTv[];
    total_pages: number;
    total_results: number;
  }> {
    const { type, query, page } = args;
    const t = type ? type : 'movie';
    const resultPage = page ? page : 1;
    const url = `https://api.themoviedb.org/3/search/${t}?api_key=${this.apiKey}&query=${query}&page=${resultPage}`;
    return request(url);
  }
}

export default Details;
