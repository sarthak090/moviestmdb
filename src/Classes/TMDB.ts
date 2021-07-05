import TV from './TV';
class TMDB extends TV {
  constructor(public apiKey: string) {
    super(apiKey);
  }
  /**
   * Discover movie or tv by different types of data like average rating, number of votes, genres and certifications.
   * @example discover("movie",[{param:"page",value:2}])
   * @param {string} [type=movie] movie or tv default:movie
   * @param {Array} args arguments such as sort_by page etc default:[]
   * @returns {Promise} object with properties of {page,results,total_results,total_pages}
   */

  async discover(
    type: 'movie' | 'tv' = 'movie',
    query: {
      param: string;
      value: string;
    }[] = [],
  ): Promise<any> {
    if (type === 'movie' || type === undefined) {
      return this.discoverMovies(query);
    } else if (type === 'tv') {
      return this.discoverTv(query);
    }
  }
}

export default TMDB;
