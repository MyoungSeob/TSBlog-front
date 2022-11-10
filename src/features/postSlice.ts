import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { readPost } from '../lib/api/post';
import { AxiosResponseError } from './userSlice';

export interface PostState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: PostFetchResult | null;
  error: AxiosResponseError | null;
  currentRequestId?: string | undefined;
}

export interface PostFetchResult {
  title: string;
  body: string;
  tags: string[];
  publishedDate: string;
  user: {
    _id: string;
    username: string;
  };
  _id: string;
}

const initialState: PostState = {
  loading: 'idle',
  result: null,
  error: null,
  currentRequestId: undefined,
};

export const fetchReadPost = createAsyncThunk<
  PostFetchResult,
  { id: string | undefined },
  { rejectValue: AxiosResponseError }
>('post/READ_POST', async ({ id }, { rejectWithValue }) => {
  try {
    if (id !== undefined) {
      const result = await readPost(id);
      return result;
    } else {
      return console.log('에러');
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const { data, status, statusText } = e.response;
      return rejectWithValue({
        data,
        status,
        statusText,
      });
    } else {
      throw new Error('포스트 가져오기 에러입니다');
    }
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initialize: (state) => {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadPost.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchReadPost.fulfilled, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = 'idle';
          state.result = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchReadPost.rejected, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId &&
          action.payload !== undefined
        ) {
          state.loading = 'idle';
          state.error = action.payload;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { initialize } = postSlice.actions;
export default postSlice.reducer;
