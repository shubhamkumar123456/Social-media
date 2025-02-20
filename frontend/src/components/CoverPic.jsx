import React, { useState } from 'react'
import ProfilePicUpdate from './ProfilePicUpdate'
import { FaCamera } from "react-icons/fa";

const CoverPic = () => {
     const [uploadedProfilePic, setuploadedProfilePic] = useState("");
       console.log(uploadedProfilePic)
   
       const handleCoverChanger = (e)=>{
           let file = e.target.files[0];
           // console.log(file)
           setuploadedProfilePic(file)
       }
  return (
    <div className=' w-full m-auto h-[45vh] relative bg-green-500'>
       <img className='w-full h-full object-cover' src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />

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
