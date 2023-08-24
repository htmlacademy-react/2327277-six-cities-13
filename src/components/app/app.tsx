import { AppRoute } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import ErrorPage from '../../pages/error-page/error-page';
import { Route, Routes } from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector, useAppDispatch } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { useEffect } from 'react';
import { fetchOffersAction, checkAuthAction, fetchFavoritesAction } from '../store/api-actions';
import { isOffersDataLoading, getErrorStatus } from '../store/offers/offers-selectors';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../store/user-process/user-process-selectors';


export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersStatusLoading = useAppSelector(isOffersDataLoading);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (!isAuthChecked || isOffersStatusLoading) {
    return (
      <LoadingPage/>
    );
  }

  if (hasError) {
    return (
      <ErrorPage/>);
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root}
            element={
              <MainPage/>
            }
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login}
            element={
              <LoginPage/>
            }
          />
          <Route path={`${AppRoute.Offer}/:id`}
            element={<OfferPage/>}
          />
          <Route path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
