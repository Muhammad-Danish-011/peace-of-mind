import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Searchcss from './Search.module.css'

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
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      margin: 'auto',
    }}
    >
    <Paper
      component='form'
      onSubmit={onhandleSubmit}
      sx={{
        border: '1px solid #e3e3e3',
        borderRadius: 2,
        boxShadow: 'none',
         p: '2px', color: 'grey' ,
        width: '90%'
      }}
      
    >
      <input
        className={Searchcss.searchbar}
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Paper>
    <IconButton type='submit'
     sx={{
        p: '1px', color: 'grey',
       border: '1px solid #e3e3e3',
        borderRadius: 2,
        boxShadow: 'none', 
       }}
        aria-label='search'>
        <SearchIcon /> 
        Search
      </IconButton>
    </Box>
  );

};

export default Search;
