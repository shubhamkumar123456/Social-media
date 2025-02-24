import React from 'react'
import Sidebarcomp from '../components/Sidebarcomp'


const Home = () => {
  return (
    <div className='flex shrink-0'>
      <div className='fixed top-[65px] shrink-0  left-0 w-[240px] h-screen bg-white'>
        <Sidebarcomp/>
      </div>
      <div style={{width:'calc(100vw - 250px)'}} className='fixed top-[65px] min-h-screen right-0  bg-amber-300'></div>
    </div>
  )
}

export default Home
