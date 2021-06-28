const fetch = require("node-fetch");
/**
 * Create a tmdb api instance using this class
 */
class MoviesTmdb {
  /**
   * Create tmdb instance
   * @param {string} apiKey put your tmdb api key here
   * @returns {void}
   */
  constructor(apiKey) {
    this.apiKey = apiKey;

    if (apiKey == undefined || apiKey.length == 0) {
      console.log(`Please Provide an api key`);
      return;
    }
  }

  static _tmdbUrl(type, args) {
    const { page } = args;
    return `https://api.themoviedb.org/3/movie/${type}?api_key=${this.apiKey}&page=${page}`;
  }
  static _tmdbUrlTv(type, args) {
    if (args) {
      const { page } = args;
      return `https://api.themoviedb.org/3/tv/${type}?api_key=${this.apiKey}&page=${page}`;
    }
    return `https://api.themoviedb.org/3/tv/${type}?api_key=${
      this.apiKey
    }&page=${1}`;
  }
  /**
   * Get list of  movies of different types
   * @example movies("top_rated",2)
   * @param  {string} type - popular or top_rated or upcoming or on_the_air default:popular
   * @param  {number} page - page number default:1
   * @returns {Promise} Promise containing object with properties page, results, total_pages, and total_results
   */
  async movies(type = "popular", page = 1) {
    // return MoviesTmdb._request2(MoviesTmdb._tmdbUrl(type, args));
    return MoviesTmdb._request2(`
    https://api.themoviedb.org/3/movie/${type}?api_key=${this.apiKey}&page=${page}
    `);
  }
  /**
   * Get list of  tv shows of different types
   * @example tvShows("popular",1)
   * @param  {string} type - popular or top_rated or airing_today or latest or on_the_air
   * @param  {number} page - page number
   * @returns {Promise} Promise containing object with properties page, results, total_pages, and total_results
   */
  async tvShows(type = "popular", page = 1) {
    return MoviesTmdb._request2(`
      https://api.themoviedb.org/3/tv/${type}?api_key=${this.apiKey}&page=${page}
      `);
  }
  /**
   * Get Single Movie Data
   * @param {number} id id of the movie
   * @param {object} args objects with properties of append:array ,getProviders:boolean
   * @example
   *  args{
   * getProviders:true,
   * append:["credits"]
   * }
   * @returns {Promise} detail object of the movie such as title id backdrop_path etc
   *
   */

  static getResult(args) {
    return {
      ...args,
    };
  }
  async movie(
    id = 0,
    args = {
      getProviders: false,
      append: [""],
    }
  ) {
    let resp;
    let providers = {};

    if (args == undefined) {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`
      );
    }
    const { getProviders, append } = args;
    const reqParams = append ? append.join(",") : "";
    const query =
      reqParams.length > 0 ? `&append_to_response=${reqParams}` : "";

    if (getProviders == true) {
      providers = await this.getProvider("movie", id, 1);
    }
    resp = await MoviesTmdb._request2(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}${query}`
    );
    return {
      ...resp,
      providers,
    };
  }
  /**
   * Get Tv show Data by there id and append other data like
   * @param {number} id id of the tv-show
   * @param {object} [args={getProviders:false,append:[]}]
   *  objects with properties of append:array ,getProviders:boolean
   * @param {boolean}  args.getProviders - true or false | Get providers
   * @param {Array<String>} args.append - data you want to append | videos ,images,credits
   * @example
   *  args{
   * getProviders:true,
   * append:["credits"]
   * }
   * @returns {Promise} detail object of the tv-show such as title id backdrop_path etc
   *
   */
  async tv(
    id = 0,
    args = {
      getProviders: false,
      append: [""],
    }
  ) {
    let resp;
    let providers = {};

    if (args == undefined) {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`
      );
    }
    const { getProviders, append } = args;
    const reqParams = append ? append.join(",") : "";
    const query =
      reqParams.length > 0 ? `&append_to_response=${reqParams}` : "";

    if (getProviders == true) {
      providers = await this.getProvider("tv", id, 1);
    }
    resp = await MoviesTmdb._request2(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}${query}`
    );
    return {
      ...resp,
      providers,
    };
  }
  /**
   * Discover movie or tv by different types of data like average rating, number of votes, genres and certifications.
   * @example discover("movie",[{param:"page",value:2}])
   * @param {string} [type=movie] movie or tv default:movie
   * @param {Array} args arguments such as sort_by page etc default:[]
   * @returns {Promise} object with properties of {page,results,total_results,total_pages}
   */

  async discover(type = "movie", query = []) {
    if (type == "movie" || type == undefined) {
      return this.discoverMovies(query);
    } else if (type == "tv") {
      return this.discoverTv(query);
    }
  }
  /**
   * Discover movies  by different types of data like average rating, number of votes, genres and certifications.
  * @example discoverMovies( [{param:"page",value:1}])  * 
  * @param {Array<Object>} query array of objects with properties param and value .
  * @returns {Promise} object with properties of {page,results,total_results,total_pages}

  */
  async discoverMovies(query = []) {
    if (query.length > 0) {
      return MoviesTmdb._request2(`
        https://api.themoviedb.org/3/discover/movie?api_key=${
          this.apiKey
        }${getParams(query)}`);
    } else {
      return MoviesTmdb._request2(`
      https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`);
    }
  }

  /**
   * Discover tv shows  by different types of data like average rating, number of votes, genres and certifications.
  * @example discoverTv ( [{param:"page",value:1}])  * 
  * @param {Array<Object>} query array of objects with properties param and value .
  * @returns {Promise} object with properties of {page,results,total_results,total_pages}

  */
  async discoverTv(query = []) {
    if (query.length > 0) {
      let queryParams = query;
      return MoviesTmdb._request2(`
        https://api.themoviedb.org/3/discover/tv?api_key=${
          this.apiKey
        }${getParams(queryParams)}`);
    } else {
      return MoviesTmdb._request2(`
      https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}`);
    }
  }

  /**
   * Get similar movies or tv by there id
   * @example getSimilar("movie",337404,1)
   * @param {string} type movie or tv
   * @param {Number} id  id of movie or tv
   * @param {Number} page  page number
   * @returns {Promise} Promise containing object with properties page, results, total_pages, and total_results
   *
   *
   */
  async getSimilar(type = "movie", id = 0, page = 1) {
    if (id > 0) {
      if (type == "tv" || type.length == 0 || type == undefined) {
        return MoviesTmdb._request2(
          `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${this.apiKey}&page=${page}`
        );
      } else {
        return MoviesTmdb._request2(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.apiKey}&page=${page}`
        );
      }
    } else {
      return errorMsg(404, `Please Provide Valid Id`);
    }
  }
  /**
   * Get images of the movie or tv show by there ids
   * @example getImages("movie",337404)
   * @param {string} type movie or tv default:movie
   * @param {number} id valid id of movie or tv
   * @returns {Promise} Promise containing object with properties : id,backdrops,posters
   */
  async getImages(type = "movie", id = 0) {
    if (id > 0) {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${this.apiKey}`
      );
    } else {
      return errorMsg(404, `Please Provide A valid id`);
    }
  }

  /**
   *
   * @param {string} type movie or tv default:movie
   * @param {number} id valid id of movie or tv
   * @returns {Promise} Promise containing object with properties : id,results
   */
  async getVideos(type = "movie", id = 0) {
    if (id > 0) {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${this.apiKey}`
      );
    } else {
      return errorMsg(404, `Please Provide A valid id`);
    }
  }
  /**
   *
   * @param {string} type movie or tv default:movie
   * @param {number} id id of the movie or tv
   * @param {number} page page number default:1
   * @returns {Promise} object with property id results
   */
  async getProvider(type = "movie", id = 0, page = 1) {
    if (type == "tv") {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${this.apiKey}&page=${page}`
      );
    } else {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${this.apiKey}&page=${page}`
      );
    }
  }
  /**
   * Get the details about the movie or tv by there id
   * @example getDetail({
   *        type:"movie",
   * id:3337404,
   * page:1,
   * detail:"recommendations"
   * })
   * @param {GetDetail} args - provide object with the properties of id,page,detail,type
   * @returns {Promise} Objects with results
   */

  async getDetails(args) {
    if (args == undefined) {
      return errorMsg(404, `Please provide the required arguments`);
    }
    const query = {
      type: args.type ? args.type : "movie",
      id: args.id ? args.id : 337404,
      page: args.page ? args.page : 1,
      detail: args.detail ? args.detail : "recommendations",
    };
    return MoviesTmdb._request2(
      `https://api.themoviedb.org/3/${query.type}/${query.id}/${query.detail}?api_key=${this.apiKey}&page=${query.page}`
    );
  }
  /**
   * Get the changes occurred in movie or tv by there id
   * @example getChanges("movie",337404,1)
   * @param {string} type movie or tv default:movie
   * @param {number} id id of the movie or tv
   * @param {number} page page number
   * @returns {Promise} object with propert of change
   */
  async getChanges(type = "movie", id = 0, page = 1) {
    return MoviesTmdb._request2(
      `https://api.themoviedb.org/3/${type}/${id}/changes?api_key=${this.apiKey}&page=${page}`
    );
  }
  /**
   * Get keywords related to the movie or tv by there id
   * @example getKeywords("movie",337404)
   * @param {string} type movie or tv default:movie
   * @param {number} id id of the movie or tv
   * @returns {Promise} object with property of id and results
   */
  async getKeywords(type = "movie", id = 0) {
    return MoviesTmdb._request2(
      `https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=${this.apiKey}`
    );
  }

  /**
   *  Get genres of the movie or tv
   * @example getGenres("movie")
   * @param {string} type - movie or tv default:movie
   * @returns {Promise} Promise containing object of genres list with there ids
   */

  async getGenres(type = "movie") {
    if (type == "movie" || type == undefined) {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
      );
    } else if ((type = "tv")) {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${this.apiKey}&language=en-US`
      );
    } else {
      return MoviesTmdb._request2(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
      );
    }
  }

  static _request2(url) {
    return new Promise(async (resovle, rejecet) => {
      try {
        const resp = await fetch(url);
        const response = await resp.json();

        if (response.success == false) {
          return rejecet(response);
        } else {
          return resovle(response);
        }
      } catch (err) {
        //   console.log(err.response.status, err.response.statusText);

        return rejecet(this._errorMsg({ err }));
      }
    });
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
  async search(args) {
    if (args) {
      let { type, query, page } = args;
      let t = type ? type : "movie";
      let resultPage = page ? page : 1;
      if (query == undefined) {
        return this._errorMsg({ status: 404, msg: "Provide valid parameters" });
      } else {
        const movieUri = `https://api.themoviedb.org/3/search/${t}?api_key=${this.apiKey}&query=${query}&page=${resultPage}`;
        return MoviesTmdb._request2(movieUri);
      }
    } else {
      return this._errorMsg({ status: 404, msg: "Provide valid parameters" });
    }
  }
  /**
   * Get Reviews of the movie or tv as per there id
   * @example getReviews("movie",337404)
   * @param {string} type movie or tv default:movie
   * @param {Number} id id of the movie or tv
   * @returns {Promise} Object with {id, page, result, total_pages, total_results,}
   */
  getReviews(type = "movie", id = 0, page = 1) {
    return MoviesTmdb._request2(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${this.apiKey}&page=${page}`
    );
  }
  _errorMsg(args) {
    return {
      ...args,
    };
  }
}
/**
 * 
 * @typedef  GetDetail
 * @type {object}
 * @property {string} type - movie or tv default is movie
 * @property {Number} id - id of the movie or tv
 * @property {string} detail - string option such as translations videos images similar screened_theatrically


 */

const getParams = (arr) => arr.map((q) => `&${q.param}=${q.value}`).join("");
const errorMsg = (type = 404, msg = "No Found") => {
  return {
    type,
    msg,
  };
};
module.exports = MoviesTmdb;
