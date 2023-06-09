<<<<<<< HEAD
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
    marginTop: '-1% !important',
    padding: '20px',
    // backgroundColor: '#f5f5f5', 
    margin: '0 auto' ,


  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 280px)',
    rowGap: '15px', 
    columnGap: '0px', 
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
      setCards(data.slice(0, 6)); // Limit to first 6 elements

    })
    .catch(err => console.group(err))
  },[]);
 

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/councler');
  };
  return (<>
    {!cards ? "Loading" :<Box sx={{
      ...styles.container,
      marginLeft: isSmallScreen ? 10 : theme.spacing(5)
    }}>
    <TappointLink/>
      <Search  onClick={handleSearchClick}/>
      {/* Suggested for you */}
      <Box sx={{...styles.cardContainer,
      marginLeft: isSmallScreen ? 1: theme.spacing(-11)}}
      >
        {
        cards.map((card) => (
          <BasicCard key={`card-${card.id}`} basicCard={card} sx={{marginRight: '20px', marginBottom: '20px'}}/> 
        ))
        }
      </Box>
      <Card/>
    </Box>}
    </>)
}

export default Home;


=======
import React from 'react'
import Search from '../../components/Search'
import TappointLink from '../../components/TappointLink'
import Tappoint from '../../components/Tappoint'
import Prevappoints from '../../components/Prevappoints'
import MiniCard from '../../Components/MiniCard'

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='center' style={{ marginTop: '20px', display: 'flex' }}>
        <Search/>
        <TappointLink/>
      </div>
      <div style={{
        marginTop: '-83px',
        width: '100%',
        maxWidth: '800px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column', // new line
        alignItems: 'center',
        backgroundColor:'#8FB3AC'
      }}>
        <Tappoint />
        <Prevappoints />
        <MiniCard />
      </div>
    </div>
  )
}

export default Home
>>>>>>> 6af1896 (home screen chnages)
