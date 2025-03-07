import axios from 'axios'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../store/userSlice'

const Login = () => {

  let dispatch = useDispatch()
    let emailRef = useRef()
    let passwordRef = useRef()

    let navigate = useNavigate()


    const handleSubmit = async(e)=>{
        e.preventDefault();

        let obj = {
    
            email:emailRef.current.value,
            password:passwordRef.current.value
        }

      try {
        let res = await axios.post('http://localhost:8080/users/login', obj);
        if(res.status==201 || res.status==200){
          console.log(res.data)
            toast.success(res.data.msg,{position:'top-center'});
            localStorage.setItem('mediaApp',JSON.stringify({token:res.data.token, user:res.data.user, login:true}))
            dispatch(loginUser({token:res.data.token, user:res.data.user}))
            // navigate('/')
        }
      } catch (error) {
        toast.error('something went wrong',{position:'top-center'})
        console.log(error)
      }
    }

  return (
    <div>
   <div className="font-[sans-serif] h-[80vh]">
  <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center h-[80vh] gap-4">
    <div className=" h-[90vh] p-5 text-white  bg-amber-400">
      {/* <img src="https://readymadeui.com/image-3.webp" className="w-full h-full " alt="login-image" /> */}
    </div>
    <form className="max-w-xl w-full text-white p-6 mx-auto">
      <div className="mb-12 text-white">
        <h3 className="text-white text-4xl font-extrabold">Login</h3>
        <p className="text-white text-sm mt-6">Don't have an account <a href="#" className="text-white font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
      </div>
   
      <div>
        <label className="text-white text-sm block mb-2">Email</label>
        <div className="relative flex items-center">
          <input ref={emailRef} name="email" type="text" required className="w-full text-sm text-white border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
            <defs>
              <clipPath id="a" clipPathUnits="userSpaceOnUse">
                <path d="M0 512h512V0H0Z" data-original="#000000" />
              </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
              <path fill="none" strokeMiterlimit={10} strokeWidth={40} d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000" />
              <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000" />
            </g>
          </svg>
        </div>
      </div>
      <div className="mt-8">
        <label className="text-white text-sm block mb-2">Password</label>
        <div className="relative flex items-center">
          <input ref={passwordRef} name="password" type="password" required className="w-full text-sm text-white border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
       
        <div>
          <Link to="/forget-password" className="text-white font-semibold text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <button onClick={handleSubmit} type="button" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
          Sign in
        </button>
      </div>
   
    </form>
  </div>
</div>

    </div>
  )
}

export default Login
