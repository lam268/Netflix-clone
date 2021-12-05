import { createSlice } from "@reduxjs/toolkit";

export const getFilmURL = createSlice({
  name: "film",
  initialState: {
    value: "",
    },
    reducers: {
        setLink: (state, val) => {
            state.value = val
      }
  }
});

export const { setLink } = getFilmURL.actions;

export const selectFilm = (state) => state.film;

export default getFilmURL.reducer;
