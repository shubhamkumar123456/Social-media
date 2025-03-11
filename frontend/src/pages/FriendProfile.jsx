import React, { useEffect, useState } from 'react'


import Posts from '../components/Posts';
import CoverPic from '../components/CoverPic';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';


const FriendProfile = () => {
  
  let userSlice = useSelector((state) => state.user);
  let location = useLocation();
  let friendId = location.state

  const [friend, setfriend] = useState('');

  let getFriendData = async()=>{
    let res = await axios.get(`http://localhost:8080/users/getFriend/${friendId}`,{
      headers:{
        'Authorization':userSlice.token
      }
    })
    let data = res.data
    console.log(data)
    setfriend(data.user)
  }

  useEffect(()=>{
    getFriendData()
  },[friendId])

  const [friendPosts, setfriendPosts] = useState([]);
  const getFriendPost = async()=>{
   let res = await axios.get(`http://localhost:8080/posts/friendPost/${friendId}`,{
    headers:{
      'Authorization':userSlice.token
    }
   })
   let data = res.data
   console.log(data.posts)
   setfriendPosts(data.posts)
  }


  useEffect(()=>{
    getFriendPost()
  },[friendId])

  

  return (
    <div>
        
    
      <div  className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500">
      <div className=' w-full m-auto h-[45vh] relative bg-green-500'>
     <img className='w-full h-full object-cover' src={friend?.coverPic} alt="" />
 


<div className="profileBox">
   <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
         <img src={friend?.profilePic} className='w-full h-full object-center rounded-full object-cover' alt="" />
             <h3 className='text-center mt-3 text-xl'>{friend?.name}</h3>
           
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

     
      {friendPosts.length>0?<div className='max-w-1/4 m-auto  flex flex-col gap-2'>
                   {friendPosts.map((ele,i)=>{
                     return <Posts ele={ele}/>
                   })}
      </div> : <h1 className='text-3xl text-center my-16'>No Post Yet</h1>}
    </div>
  )
}

export default FriendProfile
