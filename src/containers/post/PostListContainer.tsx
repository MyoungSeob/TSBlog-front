import QueryString from 'qs';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostList from '../../components/post/PostList';
import { useAppDispatch, useAppSelector } from '../../features';
import { fetchPostList } from '../../features/postsSlice';
import { listPosts } from '../../lib/api/post';

const PostListContainer = () => {
  const { username } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { posts, error, loading } = useAppSelector(({ posts }) => ({
    posts: posts.result,
    loading: posts.loading,
    error: posts.error,
  }));

  useEffect(() => {
    const { tag, page } = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(fetchPostList({ username, page, tag }));
  }, [dispatch, location.search, username]);

  return <PostList posts={posts} loading={loading} error={error} />;
};

export default PostListContainer;
