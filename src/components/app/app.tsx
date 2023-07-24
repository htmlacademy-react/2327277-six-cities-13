import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';

 type AppProps = {
  offersCount: number;
 };

export default function App({offersCount}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}
            element={<MainPage offersCount={offersCount} />}
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <LoginPage/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Offer}/:offerId`}
            element={<OfferPage/>}
          />
          <Route path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
