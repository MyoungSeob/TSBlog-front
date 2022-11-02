import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserInput } from './authSlice';
import axios from 'axios';
import { register, login, check } from '../lib/api/user';
import { removeLocalStorageItem } from '../lib/functions/localStorage';
import { USER_LOCALSTORAGE_KEY } from '../lib/constants';

export interface UserState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: UserFetchReults | null;
  error: any;
  currentRequestId: string | undefined;
}

export interface UserFetchReults {
  _id: string | null;
  username: string | null;
  __v?: number | null;
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

export const fetchUserRegister = createAsyncThunk<UserFetchReults, UserInput>(
  'user/REGISTER',
  async (user: UserInput, { rejectWithValue }) => {
    const { username, password } = user;
    try {
      const result = await register({ username, password });
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          data: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText,
        } as AxiosResponseError);
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

export const fetchUserLogin = createAsyncThunk<UserFetchReults, UserInput>(
  'user/LOGIN',
  async (user, thunkOption) => {
    const { username, password } = user;
    const { rejectWithValue } = thunkOption;
    try {
      const result = await login({ username, password });
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          data: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText,
        } as AxiosResponseError);
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

export const fetchUserCheck = createAsyncThunk<UserFetchReults, void>(
  'user/CHECK',
  async (_, { rejectWithValue }) => {
    try {
      const result = await check();
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          data: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText,
        } as AxiosResponseError);
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

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
        }
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.payload;
          console.log(action);
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
        }
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
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
        }
      })
      .addCase(fetchUserCheck.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.payload;
          state.result = null;
          removeLocalStorageItem(USER_LOCALSTORAGE_KEY);
        }
      });
  },
});

export const { logout, tempSetUser } = userSlice.actions;
export default userSlice.reducer;
