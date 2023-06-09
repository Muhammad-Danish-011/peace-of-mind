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
