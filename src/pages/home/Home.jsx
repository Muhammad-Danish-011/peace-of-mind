import React from 'react'
import Search from '../../components/Search'
import TappointLink from '../../components/TappointLink'
import Tappoint from '../../components/Tappoint'
import Prevappoints from '../../components/Prevappoints'
import MiniCard from '../../Components/MiniCard'

const Home = () => {
  return (
    <>
    <div className='center'>
      {/* <Search/> 
      <TappointLink/> */}
    </div>

    <div className='right-side' style={{ position: 'absolute', 
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