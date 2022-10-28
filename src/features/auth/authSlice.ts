import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    username: string;
    password: string;
  };
}

interface Action {
  form: 'login' | 'register';
  key: string | 'username' | 'password' | 'passwordConfirm';
  value: string;
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
    change_field: (state: any, action: PayloadAction<Action>) => {
      state[action.payload.form][action.payload.key] = action.payload.value;
    },
    initialize_form: (state, action: PayloadAction<Action>) => {
      state = {
        ...state,
        [action.payload.form]: state[action.payload.form],
      };
    },
  },
});

export const { change_field, initialize_form } = authSlice.actions;
export default authSlice.reducer;
