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
// import { OfferPreview } from '../../types/offer-types';
import { useAppSelector } from '../../hooks';

 type AppProps = {
  // offersList: OfferPreview[];
  offers: Offer[];
  reviews: Review[];
 };

export default function App({ offers, reviews}: AppProps): JSX.Element {
  const offersList = useAppSelector((state) => state.offers);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}
            element={
              <MainPage/>
            }
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage offersList = {offersList}/>
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
          <Route path={`${AppRoute.Offer}/:id`}
            element={<OfferPage offers = {offers} reviews = {reviews} offersList={offersList}/>}
          />
          <Route path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
