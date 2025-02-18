import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let userDetails = JSON.parse(localStorage.getItem('mediaApp'))
console.log(userDetails)
const initialState = {
  login:userDetails? userDetails.login : false,
  token: userDetails?  userDetails.token: '',
  user:userDetails? userDetails.user : ''
}

export const fetchUserByToken = createAsyncThunk(
    'fetchUserByToken',
    async (token) => {
      const response = await axios.get('http://localhost:8080/users/loggedInUser',{
        headers:{
            'Authorization':token
        }
      })
      console.log(response)
      return response.data
    },
  )
  

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   loginUser:(state,action)=>{
        state.login = true;
        state.token = action.payload.token
        state.user = action.payload.user
   },
   logoutUser:(state)=>{
     localStorage.removeItem('mediaApp')
    state.login=false;
    state.token = '';
    state.user = ''
   }
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
        console.log(action)
        state.user = action.payload
      // Add user to the state array
    //   state.entities.push(action.payload)
    })
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer