import React from 'react';
import styled from '@emotion/styled';
import palette from '../../lib/styles';
import Button, { ButtonProps } from '../base/Button';
import { Link } from 'react-router-dom';
import { UserInput } from '../../features/authSlice';

/*
    회원가입 또는 로그인 폼을 보여줍니다.
*/

export interface AuthFormProps {
  type: 'login' | 'register';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  form: UserInput;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errorMessage: string | null;
}

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)<ButtonProps>`
  margin-top: 1rem;
`;

/**
 * 에러를 보여줍니다.
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;
const AuthForm = ({
  type,
  onChange,
  form,
  onSubmit,
  errorMessage,
}: AuthFormProps) => {
  const text = type === 'login' ? '로그인' : '회원가입';
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          onChange={onChange}
          type="password"
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
