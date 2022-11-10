import styled from '@emotion/styled';
import { PostListParameterType } from '../../lib/api/post';
import qs, { ParsedQs } from 'qs';
import Button from '../base/Button';

export interface PagenationProps {
  lastPage?: number;
  username: string | undefined;
  page: any;
  tag: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined;
}

const PagenationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }: PagenationProps) => {
  if (typeof page === 'number') {
    const query = qs.stringify({ tag, page });
    return username ? `/@${username}/${query}` : `/?${query}`;
  }
};

const Pagenation = ({ lastPage, page, tag, username }: PagenationProps) => {
  return (
    <PagenationBlock>
      <Button
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
        fullwidth={false}
        cyan={false}
        disabled={page === 1}
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
        fullwidth={false}
        cyan={false}
        disabled={page === lastPage}
      >
        다음
      </Button>
    </PagenationBlock>
  );
};

export default Pagenation;
