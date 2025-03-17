import React, { useEffect, useState } from 'react'


import Posts from '../components/Posts';
import CoverPic from '../components/CoverPic';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';
import { toast } from 'react-toastify';
import { updateUser } from '../store/userSlice';


const FriendProfile = () => {

  let dispatch = useDispatch()
  let userSlice = useSelector((state) => state.user);
  console.log(userSlice)
  let location = useLocation();
  let friendId = location.state

  const [friend, setfriend] = useState('');

  let getFriendData = async () => {
    let res = await axios.get(`http://localhost:8080/users/getFriend/${friendId}`, {
      headers: {
        'Authorization': userSlice.token
      }
    })
    let data = res.data
    console.log(data)
    setfriend(data.user)
  }

  useEffect(() => {
    getFriendData()
  }, [friendId])

  const [friendPosts, setfriendPosts] = useState([]);
  const getFriendPost = async () => {
    let res = await axios.get(`http://localhost:8080/posts/friendPost/${friendId}`, {
      headers: {
        'Authorization': userSlice.token
      }
    })
    let data = res.data
    console.log(data.posts)
    setfriendPosts(data.posts)
  }


  useEffect(() => {
    getFriendPost()
  }, [friendId])



  const handleFollow = async()=>{
    let res = await axios.put(`http://localhost:8080/users/follow/${friendId}`,{},{
      headers:{
        'Authorization': userSlice.token
      }
    })
    let data = res.data;
    console.log(data)
    toast.success(data.msg,{position:"bottom-right"})
    setfriend(data.friend)
    dispatch(updateUser(data.user))
  }

  return (
    <div>


      <div className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500">
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
      <div className="mid mb-5 w-[90%] flex justify-center m-auto relative text-center mt-5 ">
        <div className='flex justify-center gap-7 '>
          <span>
            <b>Posts</b>
            <p>{friendPosts.length}</p>
          </span>
          <span>
            <b>Followers</b>
            <p>{friend?.followers?.length}</p>
          </span>
          <span>
            <b>Followings</b>
            <p>{friend?.followings?.length}</p>
          </span>
        </div>

        <div className='flex gap-2 absolute right-0'>
          {
            friend?.followers?.includes(userSlice?.user?._id) ?
              <button onClick={handleFollow} className='bg-green-700 px-3 py-2 rounded-md hover:bg-green-800 text-white'>Unfollow</button>
              :
              <button onClick={handleFollow} className='bg-green-700 px-3 py-2 rounded-md hover:bg-green-800 text-white'>Follow</button>
          }


        </div>

      </div>


      {friendPosts.length > 0 ? <div className='max-w-1/4 m-auto  flex flex-col gap-2'>
        {friendPosts.map((ele, i) => {
          return <Posts ele={ele} />
        })}
      </div> : <h1 className='text-3xl text-center my-16'>No Post Yet</h1>}
    </div>
  )
}

export default FriendProfile
