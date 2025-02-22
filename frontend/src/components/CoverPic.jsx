import React, { useState } from 'react'
import ProfilePicUpdate from './ProfilePicUpdate'
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchUserByToken } from '../store/userSlice';
import Loading from './Loading';

const CoverPic = () => {
  let userSlice = useSelector((state) => state.user);
  console.log(userSlice)
     const [timing, setTiming] = useState(false);
       
   
       let dispatch = useDispatch()

       const handleCoverChanger = async(e)=>{
          setTiming(true)
           let file = e.target.files[0];
           console.log(file)

           let formData = new FormData();
           formData.append('file',file);
           formData.append('upload_preset',"evening");

           let res = await axios.post('https://api.cloudinary.com/v1_1/dsf7eyovf/upload',formData);
          console.log(res.data.secure_url)
          let response = await axios.put('http://localhost:8080/users/update',{coverPic:res.data.secure_url},{
            headers:{
              'Authorization':userSlice.token
            }
          });
          let data = response.data;
          console.log(data)
          if(response.status==200){
            dispatch(fetchUserByToken(userSlice.token))
            setTiming(false)
    
          }
          
       }
  return (
    <div className=' w-full m-auto h-[45vh] relative bg-green-500'>
     {timing===false &&  <img className='w-full h-full object-cover' src={userSlice.user?.coverPic} alt="" />}
  { timing===true &&    <div className='w-full h-full'>
        <Loading/>
       </div>
}
<div className='updateCoverPic absolute bottom-0 right-5'>
        <label htmlFor="cover"><FaCamera size={35} color='white'/></label>
        <input onChange={handleCoverChanger} type="file" hidden id='cover' />
    </div>

<div className="profileBox">
  <ProfilePicUpdate/>    
</div>
    </div>
  )
}

export default CoverPic
