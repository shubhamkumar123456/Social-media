import React, { useState } from 'react'
import Sidebarcomp from '../components/Sidebarcomp'
import Posts from '../components/Posts'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
  let userSlice = useSelector((state) => state.user);
  // console.log(userSlice)
  const [posts, setposts] = useState([]);
  let getAllPosts = async()=>{
    console.log("hello")
    let res = await axios.get('http://localhost:8080/posts/allUsersPosts',{
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

  return (
    <div className='flex h-[80vh]'>
    {/* Sidebar - Fixed */}
    <div className='fixed top-[65px] left-0 w-[240px] h-[calc(100vh-65px)] bg-white'>
      <Sidebarcomp getAllPosts = {getAllPosts}/>
    </div>
  
    {/* Main Content - Pushed right, scrollable */}
    <div className='ml-[240px] flex-1  overflow-y-auto  bg-amber-300' style={{ height: 'calc(100vh - 65px)' }}>
        <div className='max-w-1/3 m-auto  flex flex-col gap-2'>
          {posts.map((ele,i)=>{
            return <Posts getAllPosts= {getAllPosts} key ={ele._id} ele={ele}/>
          })}
        </div>
    </div>
  </div>
  
  )
}

export default Home
