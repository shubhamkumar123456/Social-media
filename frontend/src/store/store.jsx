import { configureStore } from '@reduxjs/toolkit'
import userSlice  from './userSlice'
import socketSlice from './socketSlice'
export const store = configureStore({
  reducer: {
    user:userSlice,
    socket:socketSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})