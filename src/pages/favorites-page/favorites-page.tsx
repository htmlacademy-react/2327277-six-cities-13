import { Helmet } from 'react-helmet-async';
import { FavoritesList } from '../../components/favorites/favorites-list';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header/header-logo';
import { useAppSelector } from '../../hooks';

export default function FavoritesPage() {
  const favoriteOffers = useAppSelector((state) => state.favorites);
  const favoriteCities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));
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
              {favoriteCities.map((city) => <FavoritesList key={city} city={city} favoriteOffers={favoriteOffers} />)}
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

