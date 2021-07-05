import TMDB from './Classes/Index';

class MoviesTmdb extends TMDB {
  constructor(public apiKey: string) {
    super(apiKey);
  }
}

export = MoviesTmdb;
