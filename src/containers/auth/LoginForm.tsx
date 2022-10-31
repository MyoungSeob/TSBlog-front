import React, { useEffect } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../../features';
import { change_field, initialize_form } from '../../features/authSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.auth);
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
  };

  useEffect(() => {
    dispatch(initialize_form({ form: 'login', key: '', value: '' }));
  }, [dispatch]);

  return (
    <AuthForm
      type="login"
      onChange={onChange}
      form={form}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
