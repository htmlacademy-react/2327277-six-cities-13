import { store } from '../components/store';
import { UserData } from './user-data';
import { City } from './offer-types';
import { OfferPreview } from './offer-types';
import { Offer } from './offer-types';
import { Review } from './review-types';
import { AuthorizationStatus } from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  setUserInfo: UserData | null;
};

export type OffersProcess = {
  city: City | undefined;
  offers: OfferPreview[];
  fullOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  favorites: OfferPreview[];
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isNearbyOffersLoading: boolean;
  hasError: boolean;
}

export type Reviews = {
  reviews: Review[];
  isReviewsDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

