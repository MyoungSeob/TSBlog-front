import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  register: UserInput;
  login: UserInput;
}

interface Action {
  form: 'login' | 'register';
  key: 'username' | 'password' | 'passwordConfirm';
  value: string;
}

export interface UserInput {
  username: string;
  password: string;
  passwordConfirm?: string;
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
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    change_field: (state, action: PayloadAction<Action>) => {
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
});

export const { change_field, initialize_form } = authSlice.actions;
export default authSlice.reducer;
