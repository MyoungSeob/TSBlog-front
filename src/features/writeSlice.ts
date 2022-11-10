import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { editPost, writePost } from '../lib/api/post';
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
  originalPostId: string | null;
}

export interface EditInputState extends WriteInputState {
  id: string;
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
  originalPostId: null,
};

export const fetchWritePost = createAsyncThunk<
  WritePostReturnType,
  WriteInputState,
  { rejectValue: AxiosResponseError }
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
      throw new Error('포스트 작성 에러');
    }
  }
});

export const fetchEditPost = createAsyncThunk<
  WritePostReturnType,
  EditInputState,
  { rejectValue: AxiosResponseError }
>('write/EDIT', async ({ id, title, body, tags }, { rejectWithValue }) => {
  try {
    const result = await editPost({ id, title, body, tags });
    return result;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const { data, status, statusText } = e.response;
      return rejectWithValue({ data, status, statusText });
    } else {
      throw new Error('포스트 수정 에러');
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
    setOriginalPost: (
      state,
      action: PayloadAction<{
        title: string;
        body: string;
        tags: string[];
        _id: string;
      }>,
    ) => {
      const { title, _id, body, tags } = action.payload;
      state.title = title;
      state.body = body;
      state.tags = tags;
      state.originalPostId = _id;
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
      })
      .addCase(fetchEditPost.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchEditPost.fulfilled, (state, action) => {
        if (
          state.loading === 'pending' &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = 'idle';
          state.result = action.payload;
        }
      })
      .addCase(fetchEditPost.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.payload;
        }
      });
  },
});

export const { changeField, initialize, setOriginalPost } = writeSlice.actions;
export default writeSlice.reducer;
