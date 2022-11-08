import { useLocation, useParams } from 'react-router-dom';
import Pagenation from '../../components/posts/Pagenation';
import { useAppDispatch, useAppSelector } from '../../features';
import qs from 'qs';

const PagenationContainer = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const location = useLocation();
  const { lastPage, loading, posts } = useAppSelector(({ posts }) => ({
    loading: posts.loading,
    lastPage: posts.lastPage,
    posts: posts.result,
  }));
  if (loading === 'pending' || !posts) return null;

  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: false,
  });
  return (
    <Pagenation
      page={String(page)}
      tag={tag}
      username={username}
      lastPage={lastPage}
    />
  );
};

export default PagenationContainer;
