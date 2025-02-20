import React from 'react'
import { CiCamera } from "react-icons/ci";

const ProfilePicUpdate = () => {
  
  return (
    <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
        <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" className='w-full h-full rounded-full object-cover' alt="" />
            <h3 className='text-center mt-3 text-xl'>Kunfu panda</h3>
            <div className='updateProfile absolute bottom-4 right-0'>
                <label htmlFor="profile"><CiCamera size={35} color='yellow'/></label>
                <input type="file" hidden id='profile' />
            </div>
    </div>
  )
}

export default ProfilePicUpdate
