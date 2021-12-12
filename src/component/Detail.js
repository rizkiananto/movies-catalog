import * as React from 'react';
import Box from '@mui/material/Box';
import { Star } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import DefaultPoster from '../assets/images/no-poster.png'

export default function Detail({data, open, handleClose}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box className='modal-detail-movie'>
            <div className='popup'>
                <div className='popup-header'>
                    <span></span>
                    { data.Poster !== 'N/A' && <img src={data.Poster} alt='poster' /> }
                    <div className='header-data'>
                        <p className='title'>{data.Title}<label> ({data.Year})</label></p>
                        <p className='sub'>{data.Genre} ({data.Runtime})</p>
                        { data.imdbVotes !== 'N/A' 
                            ? <div className='rating'>
                                <Star />
                                <label>{data.imdbRating} ({data.imdbVotes!=='N/A'?data.imdbVotes:''})</label>
                            </div>
                            : <label className='sub'>- No rating -</label>
                        }
                    </div>
                </div>
                <div className='popup-body'>
                    <h3>Plot</h3>
                    <p>{data.Plot}</p>
                    <hr/>
                    <div className='movie-data'>
                        <div>
                            <img src={data.Poster === 'N/A' ? DefaultPoster : data.Poster } alt='poster' />
                        </div>
                        <div className='crew'>
                            <p className='sub black'>Actors : {data.Actors}</p>
                            <p className='sub black'>Director : {data.Director}</p>
                            <p className='sub black'>Writer : {data.Writer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
