import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper,  Box, InputBase, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Searchcss from './Search.module.css';

const Search = () => {
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
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: { xs: '90%', md: '50%' },
        height: '100%',
      }}
    >
      <Paper
        component='form'
        onSubmit={onhandleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '25px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#d9d9d9',
        }}
      >
        <InputBase
          className={Searchcss.searchbar}
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            border: 'none',
            outline: 'none',
            padding: '15px',
            fontSize: '16px',
            width: '100%',
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
          color: '#000',
          '&:hover': {
            backgroundColor: '#d9d9d9',
          },
        }}
      >
        <Typography variant="button" sx={{ fontWeight: "bold"}}>
          Search
        </Typography>
        <SearchIcon sx={{ marginLeft: "5px"}} />
      </Button>
    </Box>
  );
};

export default Search;
