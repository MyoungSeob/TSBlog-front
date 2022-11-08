import { WriteInputState } from '../../features/writeSlice';
import client from './client';
import QueryString from 'qs';

export type PostListParameterType = {
  username: string | undefined;
  page:
    | string
    | string[]
    | QueryString.ParsedQs
    | QueryString.ParsedQs[]
    | undefined;
  tag:
    | string
    | string[]
    | QueryString.ParsedQs
    | QueryString.ParsedQs[]
    | undefined;
};

export const writePost = async ({ title, body, tags }: WriteInputState) => {
  const response = await client.post('/api/posts', {
    title,
    body,
    tags: tags === undefined ? [] : tags,
  });
  return response.data;
};

export const readPost = async (id: string) => {
  const response = await client.get(`/api/posts/${id}`);
  return response.data;
};

export const listPosts = async ({
  page,
  username,
  tag,
}: PostListParameterType) => {
  const queryString = QueryString.stringify({ page, username, tag });
  const response = await client.get(`/api/posts?${queryString}`);
  return response;
};
