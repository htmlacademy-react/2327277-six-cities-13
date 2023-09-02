import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchOffersAction, logoutAction } from '../store/api-actions';
import { getFavorites } from '../store/favorites/favorites-selectors';
import { getAuthorizationStatus, getUserInfo } from '../store/user-process/user-process-selectors';
import HeaderLogo from './header-logo';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const favoritesCount = useAppSelector(getFavorites).length;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(logoutAction());
    dispatch(fetchOffersAction());
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {userInfo?.avatarUrl &&
                   <img src={userInfo?.avatarUrl}
                     width={20} height={20}
                     style={{borderRadius:'50%'}}
                   />}
                      </div>
                      <span className="header__user-name user__name">{userInfo?.email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item" >
                    <a className="header__nav-link" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
