import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PostListReturnType } from '../../features/postsSlice';
import { AxiosResponseError } from '../../features/userSlice';
import palette from '../../lib/styles';
import Button from '../base/Button';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

export interface PostListProps {
  posts: PostListReturnType[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: AxiosResponseError | null;
}

export interface PostItemProps {
  username: string;
  publishedDate: string;
  tags: string[];
  hasMarginTop: boolean;
  title: string;
  _id: string;
  body: string;
}

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-of-type {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({
  hasMarginTop,
  publishedDate,
  tags,
  username,
  title,
  _id,
  body,
}: PostItemProps) => {
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={username}
        hasMarginTop={hasMarginTop}
        publishedDate={new Date(publishedDate).toLocaleString()}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error }: PostListProps) => {
  if (error) {
    return <PostListBlock>에러가 발생하였습니다.</PostListBlock>;
  }
  console.log(posts);

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button cyan={true} to="/write" fullwidth={false}>
          새 글 작성하기
        </Button>
      </WritePostButtonWrapper>
      <div>
        {loading === 'idle' &&
          posts &&
          posts.map(
            ({ title, user, tags, publishedDate, body, _id }, index) => {
              return (
                <PostItem
                  hasMarginTop={index === 0 ? false : true}
                  publishedDate={publishedDate}
                  tags={tags}
                  title={title}
                  username={'ASDF'}
                  key={_id}
                  _id={_id}
                  body={body}
                />
              );
            },
          )}
      </div>
    </PostListBlock>
  );
};

export default PostList;
