import * as React from 'react';
import DefaultPoster from '../assets/images/no-poster.png'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from 'react-redux';
import { checkID } from '../features/favouriteSlice';
import { add, remove } from '../features/favouriteSlice'

export default function RecipeReviewCard({content, onClick, addFavorite}) {
    const dispatch = useDispatch()
    const favourite = useSelector(checkID)

    const toggleFavourite = (e, movie) => {
        if (e.target.closest('svg') !== null) {
            e.target.classList.contains('favourite') ? dispatch(remove(movie)) : dispatch(add(movie))
            e.target.classList.toggle('favourite')
        } 
    }

    return (
        <div className='list-item'>
            <div className='list-thumbnail'>
                { content.Poster !== 'N/A' ? <img src={content.Poster} alt='poster'/> : <img src={DefaultPoster} alt='poster'/> }
            </div>
            <div className='list-detail' onClick={onClick}>
                <p>{content.Title}</p>
                <label>{content.Year}</label>
            </div>
            <div className='list-action'>
                <IconButton aria-label="add to favorites" onClick={(e) => toggleFavourite(e, content)}>
                    <FavoriteIcon className={favourite.includes(content.imdbID) ? 'favourite' : '' } />
                </IconButton>
            </div>
        </div>
    );
}
