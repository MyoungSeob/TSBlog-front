import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    change_field: (state, action: PayloadAction<AuthState>) => {
      state.login.username = action.payload.login.username;
      state.login.password = action.payload.login.password;
    },
  },
});

export const { change_field } = authSlice.actions;
export default authSlice.reducer;
