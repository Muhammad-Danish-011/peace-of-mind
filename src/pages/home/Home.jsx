import React from 'react'
import Search from '../../components/Search'
import TappointLink from '../../components/TappointLink'
import Tappoint from '../../components/Tappoint'
import Prevappoints from '../../components/Prevappoints'
import MiniCard from '../../Components/MiniCard'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const Home = () => {
  return (
    <>
    <React.Fragment>
  <CssBaseline />
  <Container 
    sx={{ 
      position: 'absolute', 
      top: 0, 
      left: '90px', // adjust this value as needed
      width: ' 800px auto', 
      margin: '0px auto 0', // adjust this value as needed
      backgroundColor: '#cfe8fc', 
      height: '80vh' 
    }}
  >
    {/* Your content goes here */}
  </Container>
</React.Fragment>


    {/*  */}

    <div  style={{ position: 'absolute', 
    display:'flex',
    flexDirection:'column',
    right: '0px', 
    width: '300px', 
    border: '3px ', 
    padding: '10px',
    backgroundColor:'#8FB3AC' }}>
  <Tappoint />
  <Prevappoints />
  <MiniCard />
</div>

    </>
  )
}

export default Home