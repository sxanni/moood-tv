import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { API_KEY } from "../utils/constants";
import { TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";

 export const initialState = {
  movies: [],
  genresLoaded: false,
  //   empty array below wil hold gebnres fetched by api
  genres: [],
};
// fetch genres and store in genres array
// after inititla state create new functoin getGenres = createAsyncThunk
export const getGenres = createAsyncThunk("moood/genres", async () => {
  // pass async request as a contant of data, wrapped in axios.get. insert the name of url from constants.js
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  // console.log(data);
  return genres;
});

// array to hold raw data
const createArrayFromRawData = (array, moviesArray, genres) => {
  // console.log(array);
  
  // --this console shows raw data from api
  // for each movie object in the array
  array.forEach((movie) => {
    // create empty array called movieGenders
    const movieGenres = [];
    // create function to target genres_ids in movie and for each loop of genre_ids in movie )
    movie.genre_ids.forEach((genre) => {
      //create a var name and make equal to finding genres id
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    //if movie has a backdrop(so were only looking for movies with backdrop/cover)
    if (movie.backdrop_path) {
      //we push/add the movies with covers to the movies array
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

//create get rawdata async functiomnpaging isn't necessary for movies, but when geting series you want to fetch it by paging it is essencialy a group of movies
const getRawData = async (api, genres, paging) => {
  // console.log(data);
  //create moviesArray to store movies and loop through it
  //loop says movie array has minimum number of movies as
  // 60 and the loop should loop through 10 times(i value < 10 so if loop exceeds 10 times it will be false)
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    // ---------------------------------------
    const {
      data: { results },
    } = await axios.get(
      `${api}${paging ? `&page=${i}` : ""}`
      );
    createArrayFromRawData(results, moviesArray, genres);
    return moviesArray;
  }
};

// create function to fetch movies

export const fetchMovies = createAsyncThunk(
  "moood/trending",
  async ({ type }, thunkApi) => {
     // get the current state to access the genres
    const {
      moood: { genres },
    } = thunkApi.getState();
    //call getrawdata and pass the API into it, the following appends after api get the trending url by the type,(movies,tv etc), we want t he trending by the week and ythen pass genres after.
    // const movies = await getRawData(
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
      );
      console.log(movies);
      //// dispatch an action to update the state with the new movies
      // thunkApi.dispatch(updateMovies(movies));
      
  }
);
// return getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`)

const MooodSlice = createSlice({
  name: "Moood",
  initialState,
  //// create action to update movie state
  // reducers:{
  //   updateMovies: (state, action) => {
  //       state.movies = action.payload
  //   },
  // },
  //extra reducer to handle the genres state
  extraReducers: (builder) => {
    // when the getGenres thunk is pending, set the genresLoaded state to false
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
     //// when the getGenres thunk is pending, set the genresLoaded state to false
    //  builder.addCase(getGenres.pending, (state) => {
    //   state.genresLoaded = false;
    // })
   
   
    // got movies builder function and add a fulfilled state, if fulfiled and stores in our redux store
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    // got an error because i forgot to add 3 os to my moood: below :'(
    moood: MooodSlice.reducer,
  },
});
