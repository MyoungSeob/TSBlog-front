import HeaderContainer from '../containers/common/HeaderContainer';
import PagenationContainer from '../containers/posts/PagenationContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PagenationContainer />
    </>
  );
};

export default PostListPage;
