import React, { useEffect } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../../features';
import {
  change_field,
  fetchUserRegister,
  initialize_form,
} from '../../features/authSlice';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.auth);
  const loading = form.loading;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      change_field({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchUserRegister({
        username: form.register.username,
        password: form.register.password,
      }),
    );
  };

  useEffect(() => {
    dispatch(initialize_form({ form: 'register', key: '', value: '' }));
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      form={form}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
