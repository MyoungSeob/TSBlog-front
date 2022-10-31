// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export interface UserState {
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed';
//   result: User;
//   error: string | null | undefined;
//   currentRequestId: string | undefined;
// }

// export type User = {
//   _id: string | null;
//   username: string | null;
//   __v: number | null;
// };

// const initialState: UserState = {
//   loading: 'idle',
//   error: null,
//   currentRequestId: undefined,
//   result: {
//     __v: null,
//     username: null,
//     _id: null,
//   },
// };

// export const fetchUserLogin = createAsyncThunk('user/');

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {},
// });

export {};
