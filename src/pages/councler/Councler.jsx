import React from 'react';
import { Box } from '@mui/material';
import Search from '../../components/patient/Search';
import BasicCard from '../../components/patient/BasicCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const styles = {
  container: {
    maxWidth: 1600,
    marginTop: '3% !important',
    padding: '20px',
    // backgroundColor: '#f5f5f5', // Add background color here
    margin: ' 0 auto' // Center the main container horizontally and add top margin

  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 280px)',
    rowGap: '20px', // Add row gap
    columnGap: '20px', // Add column gap
    justifyContent: 'center', 
    marginTop: '60px !important',

    // Add media query for smaller screens
    '@media (max-width: 768px)': {
      display: 'flex', // Use flexbox layout
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: '10px',
      columnGap: '10px',
    }
  }
}

const Councler = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const cards = [1,2,3,4,5,6,7];

  return (
    <Box sx={{
      ...styles.container,
      marginLeft: isSmallScreen ? 8 : theme.spacing(3)

    }}>
      <Search/>
      <Box sx={styles.cardContainer}>
        {cards.map((card) => (
          <BasicCard key={`card-${card}`} sx={{marginRight: '20px', marginBottom: '20px'}}/> 
        ))}
      </Box>
    </Box>
  )
}

export default Councler;