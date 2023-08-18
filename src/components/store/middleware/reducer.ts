import { createReducer } from '@reduxjs/toolkit';
import { fetchOffers, setActiveCity, fetchOffer, fetchReview, setOffersDataLoadingStatus, requireAuthorization, setUserInfo } from '../action';
import { CITIES_LOCATIONS, AuthorizationStatus } from '../../../const';
import { Offer, OfferPreview, City } from '../../../types/offer-types';
import { Review} from '../../../types/review-types';
import { UserData } from '../../../types/user-data';

const defaultCity = CITIES_LOCATIONS[0];

export type InitialState = {
  city: City | undefined;
  offers: OfferPreview[];
  fullOffers: Offer[];
  reviews: Review[];
  error: string | null;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
}

const initialState : InitialState = {
  city: defaultCity,
  offers: [],
  fullOffers: [],
  reviews: [],
  error: null,
  isOffersDataLoading: false,
  authorizationStatus:AuthorizationStatus.Unknown,
  userInfo: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchOffer, (state, action) => {
      state.fullOffers = action.payload;
    })
    .addCase(fetchReview, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

