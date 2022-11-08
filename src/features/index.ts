import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './authSlice';
import postSlice from './postSlice';
import postsSlice from './postsSlice';
import userSlice from './userSlice';
import writeSlice from './writeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    write: writeSlice,
    post: postSlice,
    posts: postsSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
