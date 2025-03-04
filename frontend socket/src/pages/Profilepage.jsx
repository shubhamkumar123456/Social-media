import React, { useEffect, useState } from 'react'


import Posts from '../components/Posts';
import CoverPic from '../components/CoverPic';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Profilepage = () => {


  let userSlice = useSelector((state) => state.user);
  const [posts, setposts] = useState([]);
  let getAllPosts = async()=>{
    console.log("hello")
    let res = await axios.get('http://localhost:8080/posts/yourPosts',{
      headers:{
        'Authorization':userSlice.token
      }
    })
    console.log(res)
    let data = res.data;
    console.log(data.posts)
    setposts(data.posts)
  }

  useEffect(()=>{
    getAllPosts()
  },[])
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

     
      <div className='max-w-1/4 m-auto  flex flex-col gap-2'>
                   {posts.map((ele,i)=>{
                     return <Posts ele={ele}/>
                   })}
                 </div>
    </div>
  )
}

export default Profilepage
