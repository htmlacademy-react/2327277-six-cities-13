import { Helmet } from 'react-helmet-async';
import { FavoritesList } from '../../components/favorites/favorites-list';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header/header-logo';
import { useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesFetchingStatus } from '../../components/store/favorites/favorites-selectors';
import LoadingPage from '../loading-page/loading-page';
import { RequestStatus } from '../../const';
import { FavoritesEmpty } from './favorites-empty';

export default function FavoritesPage() {
  const favoriteOffers = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFavoritesFetchingStatus);
  const isEmpty = favoriteOffers.length === 0;

  if (fetchingStatus === RequestStatus.Pending) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities: favorites'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <HeaderLogo />
            </div>
            <Header/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {isEmpty ? <FavoritesEmpty/> : <FavoritesList favoriteOffers={favoriteOffers} />}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

