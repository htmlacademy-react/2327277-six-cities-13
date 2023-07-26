import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-types';
import { FavoritesList } from '../../components/favorites/favorites-list';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavoritesPageProps = {
  offersList: OfferPreview[];
}

export default function FavoritesPage({offersList}:FavoritesPageProps) {
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);
  const favoriteCities = favoriteOffers.reduce<string[]>((acc, item) => acc.includes(item.city.name) ? [...acc, item.city.name] : acc, []);
  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities: favorites'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={ AppRoute.Login }>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesList offers = { favoriteOffers } cities = { favoriteCities }/>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={ AppRoute.Root }>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
