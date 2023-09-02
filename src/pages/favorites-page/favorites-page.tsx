import { Helmet } from 'react-helmet-async';
import { FavoritesList } from '../../components/favorites-list/favorites-list';
import { Link } from 'react-router-dom';
import { AppRoute, RequestStatus } from '../../const';
import Header from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavorites, getFavoritesFetchingStatus } from '../../components/store/favorites/favorites-selectors';
import LoadingPage from '../loading-page/loading-page';
import { FavoritesEmpty } from './favorites-empty';
import {useEffect} from 'react';
import { fetchFavoritesAction } from '../../components/store/api-actions';

export default function FavoritesPage() {
  const favoriteOffers = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFavoritesFetchingStatus);
  const isEmpty = favoriteOffers.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (fetchingStatus === RequestStatus.Pending) {
    return <LoadingPage/>;
  }

  if(isEmpty){
    return <FavoritesEmpty/>;
  }

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities: favorites'}</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesList favoriteOffers={favoriteOffers} />
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

