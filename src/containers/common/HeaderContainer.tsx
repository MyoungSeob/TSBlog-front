import Header from '../../components/common/Header';
import { useAppSelector } from '../../features';

const HeaderContainer = () => {
  const { user } = useAppSelector(({ user }) => ({ user: user.result }));
  return <Header user={user} />;
};

export default HeaderContainer;
