import { useLocation, useParams } from 'react-router-dom';
import Pagenation from '../../components/posts/Pagenation';
import { useAppSelector } from '../../features';
import qs from 'qs';

const PagenationContainer = () => {
  const { username } = useParams();
  const location = useLocation();

  const { lastPage, loading, posts } = useAppSelector(({ posts }) => ({
    loading: posts.loading,
    lastPage: posts.lastPage,
    posts: posts.result,
  }));
  if (loading === 'pending' || !posts) return null;

  const params = qs.parse(location.search, {
    ignoreQueryPrefix: false,
  });
  const page =
    params['?page'] === undefined ? 1 : parseInt(params['?page'] as string, 10);
  return (
    <Pagenation
      page={page}
      tag={params.tag}
      username={username}
      lastPage={lastPage}
    />
  );
};

export default PagenationContainer;
