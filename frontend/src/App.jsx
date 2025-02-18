import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserByToken } from './store/userSlice'
import ForgetPassword from './pages/ForgetPassword'

const App = () => {
  let userSlice = useSelector((state)=>state.user);
  let token = userSlice.token
  let login = userSlice.login
  console.log(userSlice)
  let dispatch = useDispatch()

  useEffect(()=>{
      if(token){
        dispatch(fetchUserByToken(token))
      }
  },[token])
  return (
    <div>
        <BrowserRouter>
       <div className='h-[65px]'>
       <Navbar/>
       </div>
            <Routes>
                  <Route path='/' element={login===true? <Home/> : <Navigate to={'/login'}/>}/>
                  <Route path='/signup' element={login===false? <Signup/> : <Navigate to={'/'}/>}/>
                  <Route path='/login' element={login===false? <Login/> :<Navigate to={'/'}/>}/>
                  <Route path='/forget-password' element={login===false? <ForgetPassword/> :<Navigate to={'/'}/>}/>
            </Routes>

            <ToastContainer/>
        </BrowserRouter>
    </div>
  )
}

export default App
