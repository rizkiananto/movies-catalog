import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: localStorage.getItem('favourite') ? JSON.parse(localStorage.getItem('favourite')) : [],
    movieId: localStorage.getItem('favId') ? JSON.parse(localStorage.getItem('favId')) : [],
}

const addingLocalStorage = (index, data) => {
    if (localStorage.getItem(index)) {
        let list = JSON.parse(localStorage.getItem(index))
        list.push(data)
        localStorage.setItem(index, JSON.stringify(list))
    } else {
        localStorage.setItem(index, JSON.stringify([data]))
    }
}

const removeLocalStorage = (index, data) => {
    if (localStorage.getItem(index)) {
        localStorage.setItem(index, JSON.stringify(data))
        if (data === []) localStorage.removeItem(index)
    } 
}

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState, 
    reducers: {
        add: (state, action) => {
            state.movieId.push(action.payload.imdbID)
            state.movie.push(action.payload)
            addingLocalStorage('favId', action.payload.imdbID)
            addingLocalStorage('favourite', action.payload)
        },
        removeFav: (state, action) => {
            let removedId = state.movieId.filter((val) => {
                return val !== action.payload.imdbID
            })
            let removed = state.movie.filter((val) => {
                return val.imdbID !== action.payload.imdbID
            })
            state.movieId = removedId
            state.movie = removed
            removeLocalStorage('favId', removedId)
            removeLocalStorage('favourite', removed)
        }
    }
})

export const { add, removeFav } = favouriteSlice.actions

export const revealFavourite = (state) => state.favourite.movie
export const checkID = (state) => state.favourite.movieId

export default favouriteSlice.reducer;