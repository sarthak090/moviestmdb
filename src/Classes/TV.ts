import Movies from './Movies';
import request from '../utils/request';
import getParams from '../utils/get-params';
import { RTvShow, RChanges, RProviders, RKeywords, RImages, RSimilarTV, RCertifactions } from '../types/response';
import { TVDetails } from '../types/type';
class TV extends Movies {
  constructor(public apiKey: string) {
    super(apiKey);
  }
  async discoverTv(
    query?: {
      param: string;
      value: string;
    }[],
  ): Promise<RTvShow> {
    if (query && query.length > 0) {
      const queryParams = query;
      return request(`
        https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}${getParams(queryParams)}`);
    } else {
      return request(`
      https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}`);
    }
  }
  async tv(
    id: number,
    args?: {
      getProviders?: boolean;
      append?: string[];
    },
  ): Promise<TVDetails> {
    let resp: any;
    let providers = {};

    if (args === undefined) {
      return request(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`);
    }
    const { getProviders, append } = args;
    const reqParams = append ? append.join(',') : '';
    const query = reqParams.length > 0 ? `&append_to_response=${reqParams}` : '';

    if (getProviders === true) {
      providers = await this.getTvProvider(id, 1);
    }
    resp = await request(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}${query}`);
    return {
      ...resp,
      providers,
    };
  }
  async tvShows(type: 'top_rated' | 'popular' | 'on_the_air' | 'airing_today', page?: number | 1): Promise<RTvShow> {
    const url = `https://api.themoviedb.org/3/tv/${type}?api_key=${this.apiKey}&page=${page}`;
    return request(url);
  }
  async getSimilarTv(id: number = 0, page: number = 1): Promise<RSimilarTV> {
    return request(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get images of the  tv show by there ids
   * @example getImages(337404)
   * @param {number} id valid id of  tv
   * @returns {Promise} Promise containing object with properties : id,backdrops,posters
   */
  async getTVImages(id = 0): Promise<RImages> {
    return request(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${this.apiKey}`);
  }
  /**
   * Get Providers list of tv show
   * @param {number} id id of the tv
   * @param {number} page page number default:1
   * @returns {Promise} object with property id results
   */
  async getTvProvider(id: number, page: number = 1): Promise<RProviders> {
    return request(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get the changes occurred in  tv by there id
   * @example getChanges(337404)
   * @param {number} id id of the tv
   * @param {number} page page number
   * @returns {Promise} object with propert of change
   */
  async getTvChanges(id: number = 0, page: number = 1): Promise<RChanges> {
    return request(`https://api.themoviedb.org/3/tv/${id}/changes?api_key=${this.apiKey}&page=${page}`);
  }
  /**
   * Get keywords related to the  tv by there id
   * @example getKeywords(337404)
   * @param {number} id id of the movie or tv
   * @returns {Promise} object with property of id and results
   */
  async getTvKeywords(id: number = 0): Promise<RKeywords> {
    return request(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${this.apiKey}`);
  }
  async getTvCertifications(): Promise<RCertifactions> {
    return request(`https://api.themoviedb.org/3/certification/tv/list?api_key=${this.apiKey}`);
  }
  async getTvSeason(id: number, seasonNumber: number) {
    return request(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${this.apiKey}&language=en-US`,
    );
  }

  async getTvSeasonDetail(
    id: number,
    seasonNumber: number,
    detail:
      | 'account_states'
      | 'aggregate_credits'
      | 'changes'
      | 'credits'
      | 'external_ids'
      | 'images'
      | 'translations'
      | 'videos',
  ) {
    return request(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/${detail}?api_key=${this.apiKey}&language=en-US`,
    );
  }

  async getTVEpisodes(id: number, seasonNumber: number, episodeNumber: number) {
    return request(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${this.apiKey}&language=en-US`,
    );
  }

  async getTvEpisodeDetail(
    id: number,
    seasonNumber: number,
    episodeNumber: number,
    detail:
      | 'account_states'
      | 'aggregate_credits'
      | 'changes'
      | 'credits'
      | 'external_ids'
      | 'images'
      | 'translations'
      | 'videos',
  ) {
    return request(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/${detail}?api_key=${this.apiKey}&language=en-US`,
    );
  }
  async getTvEpisodeGroup(id: number) {
    return request(`https://api.themoviedb.org/3/tv/episode_group/{id}?api_key=${this.apiKey}&language=en-US`);
  }
}

export default TV;
