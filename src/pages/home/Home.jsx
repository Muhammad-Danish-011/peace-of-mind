import React from 'react';
import { Box } from '@mui/material';
import Search from '../../components/patient/Search';
import BasicCard from '../../components/patient/BasicCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TappointLink from '../../components/patient/TappointLink';
import Card from '../../components/patient/Card';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState } from 'react';


const styles = {
  container: {
    maxWidth: 1300,
    marginTop: '3% !important',
    padding: '20px',
    // backgroundColor: '#f5f5f5', 
    margin: '0 auto' ,


  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    rowGap: '15px', 
    columnGap: '10px', 
    justifyContent: 'center', 
    marginTop: '60px !important',

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

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const cards = [1,2,3,4,5,6];
  const [cards, setCards] = useState([]);

  useEffect(() => {
    //Runs on every render
    fetch("http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get")
    .then(data => data.json())
    .then(data => {
      console.log({data})
      setCards(data)
    })
    .catch(err => console.group(err))
  },[]);
 

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/councler');
  };
  return (
    <Box sx={{
      ...styles.container,
      marginLeft: isSmallScreen ? 8 : theme.spacing(45)
    }}>
    <TappointLink/>
      <Search  onClick={handleSearchClick}/>
      <Box sx={styles.cardContainer}>
        {cards.map((card) => (
          <BasicCard key={`card-${card.counselorId}`} props={cards} sx={{marginRight: '20px', marginBottom: '20px'}}/> 
        ))}
        
      </Box>
      <Card/>
    </Box>
  )
}

export default Home;
