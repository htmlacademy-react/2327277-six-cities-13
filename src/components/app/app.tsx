import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import { Offer } from '../../types/offer-types';
import { Review } from '../../types/review-types';
import { OfferPreview } from '../../types/offer-types';

 type AppProps = {
  offersCount: number;
  offersList: OfferPreview[];
  offers: Offer[];
  reviews: Review[];
 };

export default function App({offersCount, offersList, offers, reviews}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}
            element={
              <MainPage offersCount={offersCount}
                offersList = {offersList}
              />
            }
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage/>
                {/* <FavoritesPage offersList={offersList}/> */}
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
          <Route path={ `${AppRoute.Offer}/:id` }
            element={<OfferPage offers = {offers} reviews = {reviews}/>}
          />
          <Route path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
