import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';

export default function SearchInput({onChange}) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Enter movie title here.." variant="standard" onChange={onChange} />
      </Box>
    </Box>
  );
}
