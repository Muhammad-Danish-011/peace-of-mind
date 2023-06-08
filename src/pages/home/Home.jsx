import React from 'react'
import Search from '../../components/Search'
import TappointLink from '../../components/TappointLink'
import Tappoint from '../../components/Tappoint'
import Prevappoints from '../../components/Prevappoints'

const Home = () => {
  return (
    <div>
      <Search/>
      <TappointLink/>
      <Tappoint/>
      <Prevappoints/>
    </div>
  )
}

export default Home