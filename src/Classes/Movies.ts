import request from '../utils/request';
import getParams from '../utils/get-params';
import {
  RMovies,
  RChanges,
  RProviders,
  RKeywords,
  RVideos,
  RImages,
  RSimilarMovies,
  RCertifactions,
} from '../types/response';
import { MovieDetails } from '../types/type';
class Movies {
  constructor(public apiKey: string) {}
  /**
   * Discover movies  by different types of data like average rating, number of votes, genres and certifications.
   * @example discoverMovies( [{param:"page",value:"1"}])  *
   * @param {Array<Object>} query array of objects with properties param and value .
   * @returns {Promise} object with properties of {page,results,total_results,total_pages}
   */
  async discoverMovies(
    query?: {
      param: string;
      value: string;
    }[],
  ): Promise<RMovies> {
    if (query && query.length > 0) {
      return request(`
          https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}${getParams(query)}`);
    } else {
      return request(`
        https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`);
    }
  }
  async movies(type: 'upcoming' | 'top_rated' | 'popular' | 'now_playing', page: number = 1): Promise<RMovies> {
    const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${this.apiKey}&page=${page}`;
    return request(url);
  }

  async movie(
    id: number,
    args?: {
      getProviders?: boolean;
      append?: string[];
    },
  ): Promise<MovieDetails> {
    let resp: any;
    let providers = {};

    if (args === undefined) {
      return request(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`);
    }
    const { getProviders, append } = args;
    const reqParams = append ? append.join(',') : '';
    const query = reqParams.length > 0 ? `&append_to_response=${reqParams}` : '';

    if (getProviders === true) {
      providers = await this.getMovieProvider(id, 1);
    }
    resp = await request(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}${query}`);
    return {
      ...resp,
      providers,
    };
  }
  /**
   * Get Videos related to the movies
   * @param id id of the movie
   * @returns Promise with object
   */
  async getMovieVideos(id: number = 0): Promise<RVideos> {
    return request(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}`);
  }
  async getSimilarMovies(id: number = 0, page: number = 1): Promise<RSimilarMovies> {
    return request(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get images of the movie or tv show by there ids
   * @example getImages(337404)
   * @param {number} id valid id of movie or tv
   * @returns {Promise} Promise containing object with properties : id,backdrops,posters
   */
  async getMovieImages(id = 0): Promise<RImages> {
    return request(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`);
  }
  /**
   * Get Providers list of movies
   * @param {number} id id of the movie
   * @param {number} page page number default:1
   * @returns {Promise} object with property id results
   */
  async getMovieProvider(id: number, page: number = 1): Promise<RProviders> {
    return request(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get the changes occurred in  movie by there id
   * @example getChanges(337404)
   * @param {number} id id of the movie
   * @param {number} page page number
   * @returns {Promise} object with propert of change
   */
  async getMovieChanges(id: number = 0, page: number = 1): Promise<RChanges> {
    return request(`https://api.themoviedb.org/3/movie/${id}/changes?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get keywords related to the movie  there id
   * @example getKeywords(337404)
   * @param {number} id id of the movie or tv
   * @returns {Promise} object with property of id and results
   */
  async getMovieKeywords(id: number = 0): Promise<RKeywords> {
    return request(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${this.apiKey}`);
  }
  async getMovieCertifications(): Promise<RCertifactions> {
    return request(`https://api.themoviedb.org/3/certification/movie/list?api_key=${this.apiKey}`);
  }
}

export default Movies;
