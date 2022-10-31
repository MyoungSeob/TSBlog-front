import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { register } from '../lib/api/auth';

export interface AuthState {
  register: Register;
  login: Login;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: RegisterReulst;
  error: string | null | undefined;
  currentRequestId: string | undefined;
}

interface Action {
  form: 'login' | 'register';
  key: string | 'username' | 'password' | 'passwordConfirm';
  value: string;
}

export type Register = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export type Login = {
  username: string;
  password: string;
};

export type RegisterReulst = {
  _id: string | null;
  username: string | null;
  __v: number | null;
};

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
  result: {
    __v: null,
    _id: null,
    username: null,
  },
  error: '',
};

export const fetchUserRegister = createAsyncThunk('auth/REGISTER', register);

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
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message;
        }
      });
  },
});

export const { change_field, initialize_form } = authSlice.actions;
export default authSlice.reducer;
