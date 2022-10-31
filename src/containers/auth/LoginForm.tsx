import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../../features';
import {
  change_field,
  fetchUserCheck,
  fetchUserLogin,
  initialize_form,
} from '../../features/authSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const { form, auth, error, loading } = useAppSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.result,
    error: auth.error,
    loading: auth.loading,
  }));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      change_field({
        form: 'login',
        key: name,
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
    dispatch(initialize_form({ form: 'login', key: '', value: '' }));
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
    if (auth?.username) {
      console.log('로그인 성공');
      console.log(auth);
      dispatch(fetchUserCheck());
    }
  }, [error, auth, dispatch]);

  useEffect(() => {
    if (auth?.username) {
      navigation('/');
    }
  }, [auth, navigation]);

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
