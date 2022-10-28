import React, { useEffect } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../../features';
import { change_field, initialize_form } from '../../features/auth/authSlice';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.auth);
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
