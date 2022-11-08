import styled from '@emotion/styled';
import palette from '../../lib/styles';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  className?: string;
  children: string;
  fullwidth: boolean | 1 | 0;
  cyan: boolean | 1 | 0;
  disabled?: boolean;
  to?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;

  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${({ cyan }) =>
    cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  ${({ fullwidth }) =>
    fullwidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledLinkButton = styled(Link)<ButtonProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;

  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${({ cyan }) =>
    cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  ${({ fullwidth }) =>
    fullwidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
`;
const Button = ({
  cyan,
  fullwidth,
  children,
  className,
  to,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <>
      {to ? (
        <StyledLinkButton
          to={to}
          cyan={cyan ? 1 : 0}
          fullwidth={fullwidth ? 1 : 0}
          className={className}
        >
          {children}
        </StyledLinkButton>
      ) : (
        <StyledButton
          cyan={cyan}
          fullwidth={fullwidth}
          className={className}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </StyledButton>
      )}
    </>
  );
};

export default Button;
