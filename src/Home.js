import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Navbar from './component/Navbar'
import SearchInput from './component/Search'
import Card from './component/Card'
import Detail from './component/Detail'
import Box from '@mui/material/Box';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { revealFavourite, checkID } from './features/favouriteSlice';

function App() {
    // const [movie, setMovie] = useState({"Title":"Discount Spiderman: Origins","Year":"2017","Rated":"TV-MA","Released":"20 Aug 2017","Runtime":"44 min","Genre":"Short, Comedy","Director":"Addison Kilgore","Writer":"Addison Kilgore","Actors":"Christian Anderson, Tilted Cannonz, Clarkeypoo","Plot":"A teenage boy attempts suicide by jumping in front of a car, when the car hits him he survives and he is given superpowers. After he recieves his powers the villian \"T\" is out to get him.","Language":"English","Country":"United States","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BNDM5ODA3ZDYtN2VjNy00OTI0LWFlNWYtYTc5ZjJlOTlhNWJlXkEyXkFqcGdeQXVyODE4Njg5ODQ@._V1_SX300.jpg","Ratings":[],"Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt7575846","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"})
    // const [searchResult, setSearchResult] = useState({"Search":[{"Title":"Yellow Spiderman","Year":"2017","imdbID":"tt6554480","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BM2MxYzkwODctMWNiMC00OTNiLTgwN2UtMmM4ZmU0ZWEyMjJlXkEyXkFqcGdeQXVyNDA5NzAyMjQ@._V1_SX300.jpg"},{"Title":"Spiderman: The Beginning of a New Era","Year":"2017–","imdbID":"tt6889550","Type":"series","Poster":"N/A"},{"Title":"Discount Spiderman: Origins","Year":"2017","imdbID":"tt7575846","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDM5ODA3ZDYtN2VjNy00OTI0LWFlNWYtYTc5ZjJlOTlhNWJlXkEyXkFqcGdeQXVyODE4Njg5ODQ@._V1_SX300.jpg"},{"Title":"Spiderman in the Rhineland","Year":"2016–","imdbID":"tt8618220","Type":"series","Poster":"N/A"},{"Title":"Discount Spiderman 2","Year":"2018","imdbID":"tt9146610","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYWU5YTg2ODgtYjY5Mi00ZDJhLTkyYjktYWRmNTc3ZjQ4YmJkXkEyXkFqcGdeQXVyODE4Njg5ODQ@._V1_SX300.jpg"},{"Title":"Spiderman the Verse","Year":"2019–","imdbID":"tt12122034","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ5OS00MDI0LTg4N2UtYTRmOTllM2I2NDlhXkEyXkFqcGdeQXVyNTU4OTE5Nzc@._V1_SX300.jpg"},{"Title":"Miles Morales Ultimate Spiderman","Year":"2021","imdbID":"tt14311386","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNmMzODkwNDktMTkyMy00MmU5LWE4MGMtYzIzZjdjNmJiZDRiXkEyXkFqcGdeQXVyNDU1NDQ0NzE@._V1_SX300.jpg"},{"Title":"BR Sven Otten & Spiderman dancing in Venice","Year":"2019","imdbID":"tt14584078","Type":"movie","Poster":"N/A"},{"Title":"Spiderman 5","Year":"2008","imdbID":"tt3696826","Type":"movie","Poster":"N/A"},{"Title":"Inside the Editing Room of 'Spiderman 3'","Year":"2007","imdbID":"tt5460250","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNGQxNWIxYmItMjk5NS00MWEwLTkyZDYtMWYyMWQ4OTg2ZTNlXkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg"}],"totalResults":"22","Response":"True"})
    const [movie, setMovie] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [searchVal, setSearchVal] = useState('')
    const [detail, setDetail] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef(null)

    const favourite = useSelector(revealFavourite)
    const favouriteID = useSelector(checkID)

    const getMovie = (id) => {
        console.log('fav ',favourite)
        axios.get('https://www.omdbapi.com/?i='+id+'&apikey=b893398d')
        .then(res => {
            setMovie(res.data)
            setDetail(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const searchMovie = (val) => {
        console.log(favouriteID)
        axios.get('https://www.omdbapi.com/?s='+val+'&apikey=b893398d&page=2')
        .then(res => {
            if (res.data.Response === 'False') {
                setError(res.data.Error)
                setSearchResult(null)
            } else {
                setSearchResult(res.data)
            }
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })   
    }

    const addFavorite = (val) => {
        console.log('berhasil favoritkan ',val.Title)
    }

    const openDetailModal = (selected) => {
        getMovie(selected.imdbID)
    }

    const handleSearchInput = (e) => {
        setError('')
        let value = e.target.value;
        if (value.length > 0) {
            setLoading(true)            
            setSearchVal(e.target.value)
        } else {
            setSearchResult(null)
            setLoading(false)            
        }
    }

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null
            if (searchVal!=='') searchMovie(searchVal)  
        }, 1500);

    }, [searchVal])

    return (
        <div className="App">
            <Navbar />
            <Box 
                sx={{display: 'flex', flexDirection: 'column', gap:'2rem', alignItems: 'center', justifyContent: 'center', padding: '3rem'}} >
                    <SearchInput
                        onChange={(e) => handleSearchInput(e)} />
                    <Box
                        className='card-container'
                        sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 350px)', width: '100%', flexDirection: 'row', flexWrap:'wrap', gap:'1.5rem', alignItems: 'center', justifyContent: 'center'}} >
                        { loading && <p>loading...</p> }
                        { error !== '' && <p>{error} Please try again</p> }
                        { searchResult !== null && !loading && 
                            searchResult.Search.map((item, idx) => {
                                return (
                                    <div key={idx}>
                                        <Card content={item} onClick={() => openDetailModal(item)} addFavorite={() => addFavorite(item)}/> 
                                    </div>
                                ) 
                            })
                        }
                    </Box>
            </Box>
            {
                movie && <Detail data={movie} open={detail} handleClose={() => setDetail(false)} />
            }
        </div>
    );
}

export default App;
