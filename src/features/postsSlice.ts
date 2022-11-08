import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { listPosts, PostListParameterType } from '../lib/api/post';
import { AxiosResponseError } from './userSlice';

export interface PostListState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: PostListReturnType[];
  error: AxiosResponseError | null;
  currentRequestId: string | undefined;
  lastPage: number;
}

export interface PostListReturnType {
  user: {
    _id: string;
    username: string;
  };
  _id: string;
  title: string;
  body: string;
  tags: string[];
  publishedDate: string;
  __v: number;
}

const initialState: PostListState = {
  loading: 'idle',
  result: [],
  error: null,
  currentRequestId: undefined,
  lastPage: 1,
};

export const fetchPostList = createAsyncThunk<
  {
    data: PostListReturnType[];
    lastPage: string | undefined;
  },
  PostListParameterType,
  { rejectValue: AxiosResponseError }
>('posts/LIST', async ({ page, username, tag }, { rejectWithValue }) => {
  try {
    const result = await listPosts({ page, username, tag });
    return { data: result.data, lastPage: result.headers.lastPage };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const { data, statusText, status } = e.response;
      return rejectWithValue({
        data,
        status,
        statusText,
      });
    } else {
      throw new Error('에러입니다.');
    }
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = 'idle';
          state.result = [...action.payload.data];
          state.currentRequestId = undefined;
          if (action.payload.lastPage !== undefined) {
            state.lastPage = parseInt(action.payload.lastPage);
          }
        }
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        if (state.loading === 'pending' && action.payload !== undefined) {
          state.loading = 'idle';
          state.error = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
// export const {} = postsSlice.actions;
