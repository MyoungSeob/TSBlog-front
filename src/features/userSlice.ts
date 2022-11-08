import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserInput } from './authSlice';
import axios, { AxiosError } from 'axios';
import { register, login, check } from '../lib/api/user';
import { removeLocalStorageItem } from '../lib/functions/localStorage';
import { USER_LOCALSTORAGE_KEY } from '../lib/constants';

export interface UserState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: UserFetchReults | null;
  error: AxiosResponseError | null;
  currentRequestId: string | undefined;
}

export interface UserFetchReults {
  _id: string | null;
  username: string | null;
}

export interface AxiosResponseError {
  data: string;
  status: number;
  statusText: string;
}

const initialState: UserState = {
  currentRequestId: undefined,
  loading: 'idle',
  result: null,
  error: null,
};

export const fetchUserRegister = createAsyncThunk<
  UserFetchReults,
  UserInput,
  { rejectValue: AxiosResponseError }
>('user/REGISTER', async (user: UserInput, { rejectWithValue }) => {
  const { username, password } = user;
  try {
    const result = await register({ username, password });
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      });
    } else {
      throw new Error('에러가 발생했습니다.');
    }
  }
});

export const fetchUserLogin = createAsyncThunk<
  UserFetchReults,
  UserInput,
  { rejectValue: AxiosResponseError }
>('user/LOGIN', async (user, thunkOption) => {
  const { username, password } = user;
  const { rejectWithValue } = thunkOption;
  try {
    const response = await login({ username, password });
    return response;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue({
        data: e.response.data,
        status: e.response.status,
        statusText: e.response.statusText,
      });
    } else {
      throw new Error('에러가 발생했습니다.');
    }
  }
});

export const fetchUserCheck = createAsyncThunk<
  UserFetchReults,
  void,
  { rejectValue: AxiosResponseError }
>('user/CHECK', async (_, { rejectWithValue }) => {
  try {
    const result = await check();
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      });
    } else {
      throw new Error('에러가 발생했습니다.');
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    tempSetUser: (state, action: PayloadAction<UserFetchReults>) => {
      state.result = action.payload;
    },
    logout: (state) => {
      state.result = null;
      removeLocalStorageItem(USER_LOCALSTORAGE_KEY);
    },
    errorInitialize: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRegister.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = 'idle';
          state.result = action.payload;
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        if (state.loading === 'pending' && action.payload !== undefined) {
          state.loading = 'idle';
          state.error = action.payload;
        }
      })
      .addCase(fetchUserLogin.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = 'idle';
          state.result = action.payload;
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        if (state.loading === 'pending' && action.payload !== undefined) {
          state.loading = 'idle';
          console.log(action.error);
          state.error = action.payload;
        }
      })
      .addCase(fetchUserCheck.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchUserCheck.fulfilled, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = 'idle';
          state.result = action.payload;
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(fetchUserCheck.rejected, (state, action) => {
        if (state.loading === 'pending' && action.payload !== undefined) {
          state.loading = 'idle';
          state.error = action.payload;
          state.result = null;
          removeLocalStorageItem(USER_LOCALSTORAGE_KEY);
        }
      });
  },
});

export const { logout, tempSetUser, errorInitialize } = userSlice.actions;
export default userSlice.reducer;
