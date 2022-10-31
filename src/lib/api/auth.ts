import client from './client';
import { Login, RegisterReulst } from '../../features/authSlice';

export const login = async ({ username, password }: Login) => {
  const response = await client.post('/api/auth/login', { username, password });
  return response.data;
};

export const register = async ({ username, password }: Login) => {
  const response = await client.post<RegisterReulst>('/api/auth/register', {
    username,
    password,
  });
  return response.data;
};

export const check = () => client.get('/api/auth/check');
