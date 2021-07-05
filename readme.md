# moviestmdb

a package to interact with the themoviedb api easily,the package also provide the types for the response data read below for more info

to install run 

```bash
npm i moviestmdb
      or
yarn add moviestmdb
```

**Setup**

Common Js 
```javascript
const MoviesTmdb = require('moviestmdb'); 
const tmdb = new MoviesTmdb(process.env.TMDB_API)
            
```
ES6 import

```javascript
import MoviesTmdb from "moviestmdb"
const tmdb = new MoviesTmdb(process.env.TMDB_API)
```

**Async/Await**

```javascript
    const popularMovies= await tmdb.movies("popular",2)
    console.log(popularMovies.results)
   
```
**Promise Based**
```javascript
    tmdb.movies("popular",2).then((popularMovies)=>{
        console.log(popularMovies.results)
    })
   
```

## **Methods**

 **To Discover**
 ```javascript


  //For Movies
  const discoverMovies = await tmdb.discover("movie", {
      query: [
        {
          param: "sort_by",
          value: "vote_count.desc",
        },
        {
          param: "page",
          value: 3,
        },

        
      ],
    });

  //For Tv Shows

    const discoverTvShow = await tmdb.discover("tv", {
      query: [
        {
          param: "sort_by",
          value: "vote_count.desc",
        },
        {
          param: "page",
          value: 3,
        },

        
      ],
    });
 ```
  also have methods 
  ```javascript
    tmdb.discoverMovies({
        query: [
        {
          param: "sort_by",
          value: "vote_count.desc",
        },
        {
          param: "page",
          value: 3,
        },

        
      ]
    })
  
  tmdb.discoverTv({
        query: [
        {
          param: "sort_by",
          value: "vote_count.desc",
        },
        {
          param: "page",
          value: 3,
        },

        
      ]
    })
  ```

 **Get Details About a movie and tv show**

 ```javascript
  /**
  *  To get Single movies or tv show
 */
    const append =["credits","videos","images"]
    //append will take array of strings with property you want
    const movie = await tmdb.movie(337404,{
        append:append,
        getProviders:true
    })
    const tv = await tmdb.tv(60735,{
        append:append,
        getProviders:true
    })
 ```

**To Search for movie or tv show**


```javascript
  



    /**
     *  To Search movies or tv shows
    */

      const movieSearch = await tmdb.search({
            type:"movie",
            query:"avengers",
            page:1,
    })

     const tvSearch = await tmdb.search({
            type:"tv",
            query:"avengers",
            page:1,
    })
```
**Get particular detail about the movie or tv**
```javascript
    /**
     * To Get detail about a movie
    */
      // For Movies
        const movieReviews = await tmdb.getDetails({
            type: "movie",
            id: 337404,
            detail: "reviews",
            });
        const movieImages = await tmdb.getDetails({
            type: "movie",
            id: 337404,
            detail: "images",
        });     

        const movieVideos = await tmdb.getDetails({
            type: "movie",
            id: 337404,
            detail: "videos",
        }); 

      // For Tv Show
       const tvReviews = await tmdb.getDetails({
            type: "tv",
            id: 60735,
            detail: "reviews",
            });
        const tvImages = await tmdb.getDetails({
            type: "tv",
            id: 60735,
            detail: "images",
        });     

        const tvVideos = await tmdb.getDetails({
            type: "tv",
            id: 60735,
            detail: "videos",
        });


```
 also contain other method related to this 

 ```javascript
    
    const type="movie";
    const id = 3337404;
    const page=1;

    tmdb.getSimilar(type,id,page);
    tmdb.getKeywords(type,id,page);
    tmdb.getChanges(type,id,page);
    tmdb.getVideos(type,id,page);
    tmdb.getImages(type,id,page);
    tmdb.getProvider(type,id,page);
    tmdb.getReviews(type,id,page);

 ```

 **For Genres**

 Get the genres list of the movies or tv shows

 ```javascript
 const moviesGenres = await tmdb.getGenres("movies")
 const tvShowsGenres = await tmdb.getGenres("tv")
 ```