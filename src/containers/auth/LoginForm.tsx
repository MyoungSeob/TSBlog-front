import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../../features';
import { change_field, initialize_form } from '../../features/authSlice';
import { fetchUserCheck, fetchUserLogin } from '../../features/userSlice';

import { USER_LOCALSTORAGE_KEY } from '../../lib/constants';
import { setLocalStorageItem } from '../../lib/functions/localStorage';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const { form, user, error } = useAppSelector(({ auth, user }) => ({
    form: auth.login,
    user: user.result,
    error: user.error,
    loading: user.loading,
  }));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      change_field({
        form: 'login',
        key: name as 'password' | 'username' | 'passwordConfirm',
        value,
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(
      fetchUserLogin({
        username: username,
        password: password,
      }),
    );
  };

  useEffect(() => {
    dispatch(initialize_form({ form: 'login', key: 'username', value: '' }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log('로그인 오류 발생');
      if (error.status === 401) {
        console.log(error.status);
        setLoginError('아이디 혹은 비밀번호가 틀렸습니다.');
      } else {
        setLoginError('로그인 오류 발생');
      }
      return;
    }
    if (user?.username) {
      console.log('로그인 성공');
      console.log(user);
      dispatch(fetchUserCheck());
    }
  }, [error, user, dispatch]);

  useEffect(() => {
    if (user) {
      navigation('/');
      setLocalStorageItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
      dispatch(initialize_form({ form: 'login', key: 'username', value: '' }));
    }
  }, [user, navigation, dispatch]);

  return (
    <AuthForm
      type="login"
      onChange={onChange}
      form={form}
      onSubmit={onSubmit}
      errorMessage={loginError}
    />
  );
};

export default LoginForm;
