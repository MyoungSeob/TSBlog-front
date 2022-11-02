import { WriteInputState } from '../../features/writeSlice';
import client from './client';

export const writePost = async ({ title, body, tags }: WriteInputState) => {
  const response = await client.post('/api/posts', { title, body, tags });
  return response.data;
};
