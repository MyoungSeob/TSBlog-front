import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { check, login, register } from '../lib/api/auth';

export interface AuthState {
  register: UserInput;
  login: UserInput;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: UserFetchReults | null;
  error: any;
  currentRequestId: string | undefined;
}

interface Action {
  form: 'login' | 'register';
  key: string | 'username' | 'password' | 'passwordConfirm';
  value: string;
}

export interface UserInput {
  username: string;
  password: string;
  passwordConfirm?: string;
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

const initialState: AuthState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  currentRequestId: undefined,
  loading: 'idle',
  result: null,
  error: null,
};

export const fetchUserRegister = createAsyncThunk(
  'auth/REGISTER',
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
export const fetchUserLogin = createAsyncThunk(
  'auth/LOGIN',
  async (user: UserInput, { rejectWithValue }) => {
    const { username, password } = user;
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
export const fetchUserCheck = createAsyncThunk('auth/CHECK', check);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    change_field: (
      state: Draft<AuthState | Action | any>,
      action: PayloadAction<Action>,
    ) => {
      state[action.payload.form][action.payload.key] = action.payload.value;
    },
    initialize_form: (state, action: PayloadAction<Action>) => {
      if (action.payload.form === 'login') {
        state.login = {
          username: '',
          password: '',
        };
      } else {
        state.register = {
          username: '',
          password: '',
          passwordConfirm: '',
        };
      }
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
          state.register = {
            username: '',
            password: '',
            passwordConfirm: '',
          };
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
          state.login = {
            username: '',
            password: '',
          };
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
        }
      });
  },
});

export const { change_field, initialize_form } = authSlice.actions;
export default authSlice.reducer;
