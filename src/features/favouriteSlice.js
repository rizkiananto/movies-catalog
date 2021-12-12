import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: [],
    movieId: [],
}

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState, 
    reducers: {
        add: (state, action) => {
            state.movieId.push(action.payload.imdbID)
            state.movie.push(action.payload)
        },
        remove: (state, action) => {
            state.movieId = state.movie.filter((val) => {
                return val !== action.payload.imdbID
            })
            state.movie = state.movie.filter((val) => {
                return val.imdbID !== action.payload.imdbID
            })
        }
    }
})

export const { add, remove } = favouriteSlice.actions

export const revealFavourite = (state) => state.favourite.movie
export const checkID = (state) => state.favourite.movieId

export default favouriteSlice.reducer;