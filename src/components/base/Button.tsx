import styled from '@emotion/styled';
import palette from '../../lib/styles';
import { css } from '@emotion/react';

export interface ButtonProps {
  className?: string;
  children: string;
  fullWidth: boolean;
  cyan: boolean;
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

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

const Button = ({ cyan, fullWidth, children, className }: ButtonProps) => {
  return (
    <StyledButton cyan={cyan} fullWidth={fullWidth} className={className}>
      {children}
    </StyledButton>
  );
};

export default Button;
