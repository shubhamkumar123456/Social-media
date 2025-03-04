import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';

const ForgetPassword = () => {

    let inputRef = useRef();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let obj = {
            email:inputRef.current.value
        }
        if(!obj.email){
            return toast.warning('email field can not be blank',{position:"top-center"})
        }

        let res = await axios.post('http://localhost:8080/users/forgetPassword',obj)

        let data = res.data
        console.log(data)
        toast.success(data.msg,{position:"top-center"})
        inputRef.current.value = ''
    }

  return (
    <div className='w-full h-[50vh] flex justify-center gap-6 flex-col items-center'>
        
     
        <h1 className='text-2xl font-semibold'>Forget password page</h1>
        <form action="" className='flex gap-2 items-center'>
            <h1 className='text-lg'>Enter your Email </h1>
            <input ref={inputRef} type="text" className='px-3 py-2 border rounded-md outline-none' />
            <button onClick={handleSubmit} className='bg-green-700 rounded-md cursor-pointer px-4 py-2 hover:bg-green-950 text-white'>Submit</button>
        </form>
    </div>
  )
}

export default ForgetPassword
