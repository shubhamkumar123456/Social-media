import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, userSlice } from '../store/userSlice';
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';

const Navbar = () => {
  let userSlice = useSelector((state)=>state.user);
  console.log(userSlice)
  const [show, setshow] = useState(false);

  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [searchedUsers, setSearchedUsers] = useState([]);
  console.log(searchedUsers)

  const handleSearchChanger = async(e)=>{
      // console.log(e.target.value)
      let res = await axios.get(`http://localhost:8080/users/searchUser?name=${e.target.value}`)
      let data = res.data;
      console.log(data)
      setSearchedUsers(data.users)
  }
  return (
    <div>

      <nav className="bg-black z-50  fixed text-white w-full flex  justify-between items-center mx-auto px-8 h-[60px]">
        {/* logo */}
        <div className="inline-flex">
          <Link className="_o6689fn" to="/">
          <div className="flex items-center">
           <img className='h-12 w-15' src="https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/6a198-instagram-logo-png.png?fit=512%2C512&ssl=1" alt="" />
           <h1>FriendsWeb</h1>
          </div>
          
          </Link>
        </div>
        {/* end logo */}
        {/* search bar */}
        <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
          <div className="inline-block">
            <div className="inline-flex relative items-center max-w-full">
              {/* <button className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
          <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
          <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
         
          </div>
        </button> */}
              <form action="" className='  flex items-center'>
                <input onChange={handleSearchChanger} type="text" placeholder='search a user' className='px-4 py-2 pr-6 rounded-md border outline-none ' />
                {/* <IoIosSearch className='text-white cursor-pointer' size={30} color='white'/> */}
              </form>

              <div className='bg-white text-black absolute top-full w-full'>
                {
                  searchedUsers.map((ele,i)=>{
                    return ele._id===userSlice.user?._id?<Link state={ele._id} onClick={()=>setSearchedUsers([])} to={`/profile`} className='flex items-center gap-4 px-2 py-2 border-b border-[#e1dbdb]'>
                    <img className='w-12 h-12 rounded-full border-amber-500 border' src={ele.profilePic} alt="" />
                    <h3>{ele.name}</h3>
                </Link>
                :
                <Link state={ele._id} onClick={()=>setSearchedUsers([])} to={`/friendProfile?name=${ele.name}&&id=${ele._id}`} className='flex items-center gap-4 px-2 py-2 border-b border-[#e1dbdb]'>
                        <img className='w-12 h-12 rounded-full border-amber-500 border' src={ele.profilePic} alt="" />
                           <h3>{ele.name}</h3>
                    </Link>
                  })
                }
              </div> 

            </div>
          </div>
        </div>
        {/* end search bar */}
        {/* login */}
        <div className="flex-initial">
          <div className="flex justify-end cursor-pointer items-center relative">

            <div onClick={() => setshow(!show)} style={{ cursor: "pointer !important" }} className="block relative z-50 cursor-pointer  ">
              <div className="inline relative cursor-pointer">
                <button type="button" className="flex items-center justify-center relative border rounded-full hover:shadow-lg">

                  <div className="block flex-grow-0 flex-shrink-0 h-10 w-10">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentcolor' }}>
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                    </svg>
                  </div>
                </button>
              </div>

              {show && <div className='absolute top-[130%] bg-white text-black rounded-lg right-0 w-[100px]'>
                <ul className='flex flex-col text-center gap-2 '>
                  <li onClick={() => navigate('/login')} className='px-4 border-b py-2'>Login</li>
                  <li onClick={() => navigate('/signup')} className='px-4 border-b py-2'>Signup</li>
                  <li onClick={() => navigate('/profile')} className='px-4 border-b py-2'>Profile</li>
                  <li onClick={() => dispatch(logoutUser())} className='px-4 border-b py-2'>Logout</li>
                </ul>
              </div>}
            </div>
          </div>
        </div>
        {/* end login */}
      </nav>

    </div>
  )
}

export default Navbar
