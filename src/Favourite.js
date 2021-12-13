import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { revealFavourite } from './features/favouriteSlice';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Card from './component/Card'
import Detail from './component/Detail'
import axios from 'axios';
import { Button } from '@mui/material';

const Favourite = () => {
    const favourite = useSelector(revealFavourite)
    const [movie, setMovie] = useState(favourite)
    const [movieDetail, setMovieDetail] = useState(null)
    const [detail, setDetail] = useState(false)

    const navigate = useNavigate()

    const getMovie = (id) => {
        axios.get('https://www.omdbapi.com/?i='+id+'&apikey=b893398d')
        .then(res => {
            setMovieDetail(res.data)
            setDetail(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const openDetailModal = (selected) => {
        getMovie(selected.imdbID)
    }

    const handleExplore = () => {
        navigate('/')
    }
    
    useEffect(() => {
        setMovie(favourite)
    }, [])
    
    return (  
        <>
        <Box 
            sx={{display: 'flex', flexDirection: 'column', gap:'2rem', alignItems: 'center', justifyContent: 'center', padding: '3rem'}}
            id='favourite-page' >
                { movie && movie.length > 0
                    ? <p>My Favourite Movie</p>
                    : <div>
                        <p>You don't have any favourite movie yet</p>
                        
                        <Button variant="contained" color="success" onClick={() => handleExplore()}>
                            Explore Movie
                        </Button>
                    </div>
                }
            
            <Box
                className='card-container'
                sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 350px)', width: '100%', flexDirection: 'row', flexWrap:'wrap', gap:'1.5rem', alignItems: 'center', justifyContent: 'center'}} >
                { movie && movie !== null &&
                    movie.map((item, idx) => {
                        return (
                            <div key={idx} className='card-list'>
                                <Card content={item} onClick={() => openDetailModal(item)} /> 
                            </div>
                        ) 
                    })
                }
            </Box>
        </Box>
        { movieDetail && <Detail data={movieDetail} open={detail} handleClose={() => setDetail(false)} /> }
        </>
    );
}
 
export default Favourite;