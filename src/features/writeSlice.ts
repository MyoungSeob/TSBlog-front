import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { writePost } from '../lib/api/post';
import { AxiosResponseError } from './userSlice';

export interface WriteInputState {
  title: string;
  body: string;
  tags: string[];
}

export interface WriteState extends WriteInputState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: null | WritePostReturnType;
  error: any;
  currentRequestId: string | undefined;
}

export interface WritePostReturnType {
  title: string;
  publishedDate: string;
  body: string;
  tags: string[];
  user: {
    _id: string;
    username: string;
  };
  __v: number;
  _id: string;
}

export interface ChangeFieldActionPayload {
  key: 'title' | 'body' | 'tags';
  value: string | string[];
}

const initialState: WriteState = {
  title: '',
  body: '',
  tags: [],
  currentRequestId: undefined,
  loading: 'idle',
  result: null,
  error: null,
};

export const fetchWritePost = createAsyncThunk<
  WritePostReturnType,
  WriteInputState
>('write/POST', async ({ title, body, tags }, { rejectWithValue }) => {
  try {
    const result = await writePost({ title, body, tags });
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
});

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    changeField: (state, action: PayloadAction<ChangeFieldActionPayload>) => {
      if (action.payload.key === 'tags') {
        state[action.payload.key] = action.payload.value as string[];
      } else {
        state[action.payload.key] = action.payload.value as string;
      }
    },
    initialize: (state) => {
      state.title = '';
      state.body = '';
      state.tags = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWritePost.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.result = null;
          state.error = null;
        }
      })
      .addCase(fetchWritePost.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.result = action.payload;
        }
      })
      .addCase(fetchWritePost.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.payload;
        }
      });
  },
});

export const { changeField, initialize } = writeSlice.actions;
export default writeSlice.reducer;
