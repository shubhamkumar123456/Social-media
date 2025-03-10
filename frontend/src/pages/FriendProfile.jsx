import React, { useEffect, useState } from 'react'


import Posts from '../components/Posts';
import CoverPic from '../components/CoverPic';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';


const FriendProfile = () => {

  let location = useLocation();
  console.log(location.state)

  let userSlice = useSelector((state) => state.user);

  

  return (
    <div>
        
    
      <div  className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500">
      <div className=' w-full m-auto h-[45vh] relative bg-green-500'>
     {/* <img className='w-full h-full object-cover' src={userSlice.user?.coverPic} alt="" /> */}
 


<div className="profileBox">
   <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
         {/* <img src={userSlice.user?.profilePic} className='w-full h-full object-center rounded-full object-cover' alt="" /> */}
             <h3 className='text-center mt-3 text-xl'>Kunfu panda</h3>
           
     </div>  
</div>
    </div>
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

     
      <div className='max-w-1/4 m-auto  flex flex-col gap-2'>
                   {[].map((ele,i)=>{
                     return <Posts ele={ele}/>
                   })}
                 </div>
    </div>
  )
}

export default FriendProfile
