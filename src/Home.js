import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import Search from './component/Search'
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Box 
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem'}} >
            <Search />
        </Box>
    </div>
  );
}

export default App;
