import React from 'react'
import Search from '../../components/Search'
import BasicCard from '../../Components/BasicCard'
import { Box } from '@mui/material'

const styles = {
  container: {
    maxWidth: 1200,
    marginTop:'60px !important',
    padding: '20px',
    backgroundColor: '#f5f5f5', // Add background color here
    margin: '0 auto' // Center the main container
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    rowGap: '20px', // Add row gap
    columnGap: '20px', // Add column gap
    justifyContent: 'center', 
    marginTop:'60px !important',

  }
}

const Councler = () => {

  const cards = [1,2,3,4,5,6,7];

  return (
    <Box sx={styles.container}>
      <Search/>
      <Box sx={styles.cardContainer}> {/* Create new container for the cards */}
        {cards.map((card) => (
          <BasicCard key={`card-${card}`} sx={{marginRight: '20px', marginBottom: '20px'}}/> 
        ))}
      </Box>
    </Box>
  )
}

export default Councler
