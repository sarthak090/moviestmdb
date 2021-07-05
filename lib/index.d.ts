import TMDB from './Classes/Index';
declare class MoviesTmdb extends TMDB {
    apiKey: string;
    constructor(apiKey: string);
}
export = MoviesTmdb;
