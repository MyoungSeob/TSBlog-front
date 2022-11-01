import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../features';
import { logout, UserFetchReults } from '../../features/authSlice';
import Button from '../base/Button';
import Responsive from './Responsive';

export interface HeaderProps {
  user: UserFetchReults | null;
}

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            REACTERS
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button cyan={false} fullwidth={false} onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="right">
              <Button
                to="/login"
                fullwidth={false}
                cyan={false}
                className={'header-button'}
              >
                로그인
              </Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
