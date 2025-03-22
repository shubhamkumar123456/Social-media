import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from './store/userSlice';
import ForgetPassword from './pages/ForgetPassword';
import Profilepage from './pages/Profilepage';
import FriendProfile from './pages/FriendProfile';
import Chat from './pages/Chat';
import { connectSocket, disconnectSocket } from './store/socketSlice';
import Run from './pages/Run';

const App = () => {
  let userSlice = useSelector((state) => state.user);
  let socketSlice = useSelector((state) => state.socket);
  let token = userSlice.token;
  let login = userSlice.login;
  let dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserByToken(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (userSlice?.user?._id) {
      dispatch(connectSocket(userSlice?.user?._id)); // Connect when user logs in
    }

    return () => {
      if (socketSlice.isConnected) {
        dispatch(disconnectSocket()); // Disconnect when component unmounts
      }
    };
  }, [userSlice?.user?._id, dispatch]);

  return (
    <div>
      <BrowserRouter>
        <div className='h-[65px]'>
          <Navbar />
        </div>
        <Routes>
          <Route path='/run' element={<Run />} />
          <Route path='/' element={login === true ? <Home /> : <Navigate to={'/login'} />} />
          <Route path='/profile' element={login === true ? <Profilepage /> : <Navigate to={'/login'} />} />
          <Route path='/signup' element={login === false ? <Signup /> : <Navigate to={'/'} />} />
          <Route path='/login' element={login === false ? <Login /> : <Navigate to={'/'} />} />
          <Route path='/forget-password' element={login === false ? <ForgetPassword /> : <Navigate to={'/'} />} />
          <Route path='/friendProfile' element={login === true ? <FriendProfile /> : <Navigate to={'/login'} />} />
          <Route path='/chat' element={login === true ? <Chat /> : <Navigate to={'/login'} />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;