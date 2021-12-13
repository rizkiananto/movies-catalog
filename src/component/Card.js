import React from 'react';
import DefaultPoster from '../assets/images/no-poster.png';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from 'react-redux';
import { checkID } from '../features/favouriteSlice';
import { add, removeFav } from '../features/favouriteSlice';

export default function MovieCard({content, onClick}) {
    const dispatch = useDispatch()
    const favourite = useSelector(checkID)

    const toggleFavourite = (e, movie) => {
        let svgDom = e.target.closest('svg')
        if (svgDom !== null) {
            if (svgDom.classList.contains('favourite')) {
                dispatch(removeFav(movie))
                if (document.getElementById('favourite-page') !== null && e.target.closest('.card-list') !== null) {
                    e.target.closest('.card-list').remove()
                    if (favourite > 1) {
                        e.target.closest('.list-item').removeChild()
                    }
                } 
            } else {
                dispatch(add(movie))
            }
            svgDom.classList.toggle('favourite')
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
