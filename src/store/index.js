import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

const MoodSlice = createSlice({
  name: "Mood",
  initialState,
  extraReducers: (builder) => {},
});

export const store = configureStore({
  reducer: {
    mood: MoodSlice.reducer,
  },
});
