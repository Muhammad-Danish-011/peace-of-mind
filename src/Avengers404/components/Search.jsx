import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper,  Box, InputBase, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({onClick}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: { xs: '90%', md: '60%' },
      }}
    >
      <Paper
        component='form'
        onSubmit={onhandleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '110%',
          borderRadius: '25px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#d9d9d9',
        }}
      >
        <InputBase
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            border: 'none',
            outline: 'none',
            padding: '15px',
            fontSize: '16px',
            width: '100%',
            lineHeight: '1.5em', // set line-height to adjust height of input placeholder
            fontFamily: 'inherit',
            color: 'black',
          }}
        />
      </Paper>
      <Button
      type='submit'
      variant='contained'
     sx={{
      marginLeft: '10px',
    backgroundColor: '#d9d9d9',
    borderRadius:'15px',
    color: '#000',
    '&:hover': {
      backgroundColor: '#d9d9d9',
    },
    height: '51px',
    width: '150px'
  }}
>
  <Typography variant="button" sx={{ fontWeight: "bold"}}>
    Search
  </Typography>
  <SearchIcon sx={{ marginLeft: "4px"}} />
</Button>

    </Box>
  );
};

export default Search;