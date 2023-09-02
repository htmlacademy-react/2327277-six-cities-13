import { store } from '../components/store';
import { UserData } from './user-data-types';
import { City } from './offer-types';
import { OfferPreview } from './offer-types';
import { Offer } from './offer-types';
import { Review } from './review-types';
import { AuthorizationStatus, RequestStatus } from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  setUserInfo: UserData | null;
};

export type OffersProcess = {
  city: City;
  offers: OfferPreview[];
  fullOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  favoriteOffers: OfferPreview[];
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isNearbyOffersLoading: boolean;
  isFavoriteOffersLoading: boolean;
  hasError: boolean;
}

export type Reviews = {
  reviews: Review[];
  sendingCommentStatus: RequestStatus;
}

export type FavoritesData = {
  favorites: OfferPreview[];
  fetchingStatusFavorites: RequestStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

