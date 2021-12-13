import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'
import Favourite from './Favourite'
import './App.css';
import Navbar from './component/Navbar'
import SearchInput from './component/Search'
import Card from './component/Card'
import Detail from './component/Detail'
import Box from '@mui/material/Box';
import axios from 'axios';

function Home() {
    const [movie, setMovie] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [searchVal, setSearchVal] = useState('')
    const [detail, setDetail] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef(null)

    const getMovie = (id) => {
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
        <div>
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
            { movie && <Detail data={movie} open={detail} handleClose={() => setDetail(false)} /> }
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/favourite' element={<Favourite />} />
            </Routes>
        </div>
    )
}

export default App;
