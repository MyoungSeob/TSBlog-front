import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import PostViewer from '../../components/post/PostViewer';
import { useAppDispatch, useAppSelector } from '../../features';
import { fetchReadPost, initialize } from '../../features/postSlice';
import { setOriginalPost } from '../../features/writeSlice';
import { removePost } from '../../lib/api/post';

const PostViewerContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { post, error, loading, user } = useAppSelector(({ post, user }) => ({
    post: post.result,
    error: post.error,
    loading: post.loading,
    user: user.result,
  }));

  const onEdit = () => {
    if (post) {
      dispatch(
        setOriginalPost({
          title: post.title,
          _id: post._id,
          body: post.body,
          tags: post.tags,
        }),
      );
      navigate('/write');
    }
  };

  const onRemove = async () => {
    if (postId === undefined) return;
    try {
      const result = await removePost(postId);
      navigate('/');
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);
  useEffect(() => {
    dispatch(fetchReadPost({ id: postId }));
    return () => {
      dispatch(initialize());
    };
  }, [dispatch, postId]);
  return (
    <PostViewer
      error={error}
      loading={loading}
      result={post}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default PostViewerContainer;
