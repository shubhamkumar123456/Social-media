import React, { useState } from 'react'


import Posts from '../components/Posts';
import CoverPic from '../components/CoverPic';
import { useSelector } from 'react-redux';


const Profilepage = () => {


  let userSlice = useSelector((state) => state.user);
  // console.log(userSlice)
  

  return (
    <div>
        
    
      <div  className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500">
        <CoverPic/>
      </div>
      <div className="mid mb-5 w-[50%] m-auto text-center mt-5 ">
        <div className='flex justify-center gap-7 '>
        <span>
            <b>Posts</b>
            <p>50</p>
        </span>
        <span>
            <b>Followers</b>
            <p>100</p>
        </span>
        <span>
            <b>Followings</b>
            <p>500</p>
        </span>
        </div>
    
      </div>

      <div className='bottomBox w-max flex flex-col gap-2 m-auto'>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
            <Posts/>
      </div>
    </div>
  )
}

export default Profilepage
