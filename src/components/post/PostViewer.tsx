import styled from '@emotion/styled';
import { PostFetchResult } from '../../features/postSlice';
import { AxiosResponseError } from '../../features/userSlice';
import palette from '../../lib/styles';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

export interface PostViewerProps {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  result: PostFetchResult | null;
  error: AxiosResponseError | null;
  actionButtons: React.ReactNode;
}

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({
  loading,
  error,
  result,
  actionButtons,
}: PostViewerProps) => {
  if (error) {
    if (error.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  if (loading === 'pending' || !result) {
    return null;
  }
  const { title, body, user, publishedDate, tags } = result;
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          hasMarginTop={false}
          publishedDate={publishedDate}
          username={user.username}
        />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
