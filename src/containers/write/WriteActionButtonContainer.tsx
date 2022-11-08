import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WriteActionButton from '../../components/write/WriteActionButton';
import { useAppDispatch, useAppSelector } from '../../features';
import { fetchWritePost, initialize } from '../../features/writeSlice';

const WriteActionButtonContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { title, body, tags, result, error } = useAppSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    result: write.result,
    error: write.error,
  }));

  const onPublish = () => {
    dispatch(fetchWritePost({ title, body, tags }));
  };

  useEffect(() => {
    if (result) {
      const { username } = result.user;
      dispatch(initialize());
      navigate(`/@${username}/${result._id}`);
    }
    if (error) {
      console.log(error);
    }
  }, [navigate, result, error, dispatch]);

  return (
    <WriteActionButton onPublish={onPublish} onCancel={() => navigate(-1)} />
  );
};

export default WriteActionButtonContainer;
