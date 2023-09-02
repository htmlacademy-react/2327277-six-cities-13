import { Helmet } from 'react-helmet-async';
import HeaderLogo from '../../components/header/header-logo';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../components/store/user-process/user-process-selectors';
import { RandomCityButton } from '../../components/random-city/random-city';
import { LoginForm } from '../../components/login-form/login-form';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const isAuthorized = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (isAuthorized === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [isAuthorized, navigate]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{'6 cities: autorization'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm/>
          <section className="locations locations--login locations--current">
            <RandomCityButton/>
          </section>
        </div>
      </main>
    </div>
  );
}


