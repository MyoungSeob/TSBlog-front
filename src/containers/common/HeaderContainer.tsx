import styled from '@emotion/styled';
import Header from '../../components/common/Header';
import { useAppSelector } from '../../features';

const HeaderContainer = () => {
  const { user } = useAppSelector(({ auth }) => ({ user: auth.result }));
  return <Header user={user} />;
};

export default HeaderContainer;
