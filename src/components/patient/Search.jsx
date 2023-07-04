import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputBase, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from './Card';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicCard from './BasicCard';


const styles = {
  container: {
    maxWidth: 1300,
    marginTop: '-1% !important',
    padding: '20px',
    // backgroundColor: '#F5F5F5',
    margin: '0 auto',

  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 280px)',
    rowGap: '15px',
    columnGap: '0px',
    justifyContent: 'center',
    marginTop: '40px !important',
    justifyContent: 'center',
    alignItems: 'center',
    // Add media query for smaller screens
    '@media (max-width: 1000px)': {// import Card from '../../components/patient/Card';
      display: 'flex', // Use flexbox layout
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: '10px',
      columnGap: '5px',
    },

  }
}


const Search = ({ onClick }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    //Runs on every render
    fetch("http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get")
      .then(data => data.json())
      .then(data => {
        console.log({ data })
        setCards(data.slice(0, 8))
        data.filter(value => value.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchTerm(data)
      })
      .catch(err => console.group(err))

  }, []);

  useEffect(() => {
    // Filter cards based on search term
    const filtered = cards.filter(card =>
      card.title && card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);



  return (
    <>

      <Box
        onClick={onClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          width: { xs: '90%', md: '70%' },
        }}
      >
        <Paper
          component='form'
          onSubmit={onhandleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '110%',
            margin: '30px',
            borderRadius: '25px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#D9D9D9',
          }}
        >
          <InputBase
            placeholder='Search here'
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
            backgroundColor: '#D9D9D9',
            borderRadius: '15px',
            color: '#000',
            '&:hover': {
              backgroundColor: '#D9D9D9',
            },
            height: '51px',
            width: '150px'
          }}
        >
          <Typography variant="button" sx={{ fontWeight: "bold" }}>
            Search
          </Typography>
          <SearchIcon sx={{ marginLeft: "4px" }} />
        </Button>
      </Box>

      {<Box sx={{
        ...styles.container,
        marginLeft: isSmallScreen ? 10 : theme.spacing(5),
        display: 'grid',

      }}>


        <Box sx={{
          ...styles.cardContainer,
          marginLeft: isSmallScreen ? 1 : theme.spacing(-11),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          {/* {
            cards.map((card) => (
              // console.log(card)
              <BasicCard key={`card-${card.id}`} basicCard={card} sx={{ marginRight: '20px', marginBottom: '20px' }} />
            ))
          } */}

          {searchTerm === '' ? (
            // Render all cards when no search term is entered
            cards.map(card => (
              <BasicCard
                key={`card-${card.id}`}
                basicCard={card}
                sx={{ marginRight: '20px', marginBottom: '20px' }}
              />
            ))
          ) : (
            // Render filtered cards when a search term is entered
            filteredCards.map(card => (
              <BasicCard
                key={`card-${card.id}`}
                basicCard={card}
                sx={{ marginRight: '20px', marginBottom: '20px' }}
              />
            ))
          )}
        </Box>

      </Box>}
    </>
  );
};
export default Search;