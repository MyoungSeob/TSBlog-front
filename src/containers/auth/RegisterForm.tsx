import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../../features';
import { change_field, initialize_form } from '../../features/authSlice';
import {
  errorInitialize,
  fetchUserCheck,
  fetchUserRegister,
} from '../../features/userSlice';
import { USER_LOCALSTORAGE_KEY } from '../../lib/constants';
import { setLocalStorageItem } from '../../lib/functions/localStorage';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { form, user, error } = useAppSelector(({ auth, user }) => ({
    form: auth.register,
    user: user.result,
    error: user.error,
    loading: user.loading,
  }));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      change_field({
        form: 'register',
        key: name as 'password' | 'username' | 'passwordConfirm',
        value,
      }),
    );
  };

  const onErrorInitialize = () => {
    dispatch(errorInitialize());
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setRegisterError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      dispatch(change_field({ form: 'register', key: 'password', value: '' }));
      dispatch(
        change_field({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(
      fetchUserRegister({
        username: form.username,
        password: form.password,
      }),
    );
  };

  useEffect(() => {
    dispatch(initialize_form({ form: 'register', key: 'password', value: '' }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      if (error.status === 409) {
        setRegisterError('이미 존재하는 계정명입니다.');
        return;
      }
      setRegisterError('회원가입 오류 발생');
      return;
    }
    if (user) {
      console.log('회원가입 성공');
      console.log(user);
      dispatch(fetchUserCheck());
    }
  }, [error, user, dispatch]);

  useEffect(() => {
    if (user) {
      navigation('/');
      setLocalStorageItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
      dispatch(
        initialize_form({ form: 'register', key: 'password', value: '' }),
      );
    }
  }, [user, navigation, dispatch]);

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      form={form}
      onSubmit={onSubmit}
      errorMessage={registerError}
      onErrorInitialize={onErrorInitialize}
    />
  );
};

export default RegisterForm;
