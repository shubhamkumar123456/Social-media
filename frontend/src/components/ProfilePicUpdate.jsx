import axios from 'axios';
import React from 'react'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from '../store/userSlice';

const ProfilePicUpdate = () => {
  let userSlice = useSelector((state) => state.user);
  console.log(userSlice)

  let dispatch = useDispatch()
  const handleProfileChanger = async(e)=>{
      let file = e.target.files[0];
      console.log(file)

      let formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset','evening')

      let res = await axios.post('https://api.cloudinary.com/v1_1/dsf7eyovf/upload',formData);
      console.log(res)
      console.log(res.data.secure_url);

      let response = await axios.put('http://localhost:8080/users/update',{profilePic:res.data.secure_url},{
        headers:{
          'Authorization':userSlice.token
        }
      });
      let data = response.data;
      console.log(data)
      if(response.status==200){
        dispatch(fetchUserByToken(userSlice.token))

      }

  }
  return (
    <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
        <img src={userSlice.user?.profilePic} className='w-full h-full object-center rounded-full object-cover' alt="" />
            <h3 className='text-center mt-3 text-xl'>Kunfu panda</h3>
            <div className='updateProfile absolute bottom-4 right-0'>
                <label htmlFor="profile"><CiCamera size={35} color='yellow'/></label>
                <input onChange={handleProfileChanger} type="file" hidden id='profile' />
            </div>
    </div>
  )
}

export default ProfilePicUpdate
