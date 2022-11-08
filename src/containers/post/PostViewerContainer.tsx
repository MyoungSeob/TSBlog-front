import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import { useAppDispatch, useAppSelector } from '../../features';
import { fetchReadPost, initialize } from '../../features/postSlice';

const PostViewerContainer = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const { post, error, loading } = useAppSelector(({ post }) => ({
    post: post.result,
    error: post.error,
    loading: post.loading,
  }));

  useEffect(() => {
    dispatch(fetchReadPost({ id: postId }));
    return () => {
      dispatch(initialize());
    };
  }, [dispatch, postId]);
  return <PostViewer error={error} loading={loading} result={post} />;
};

export default PostViewerContainer;
