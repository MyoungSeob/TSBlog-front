import { css } from '@emotion/react';
import styled from '@emotion/styled';
import palette from '../../lib/styles';

export interface SubInfoProps {
  hasMarginTop: boolean;
  username: string;
  publishedDate: string;
}

const SubInfoBlock = styled.div<{ hasMarginTop: boolean }>`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray[6]};
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const SubInfo = ({ hasMarginTop, username, publishedDate }: SubInfoProps) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>{username}</b>
      </span>
      <span>{publishedDate}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
