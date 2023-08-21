import { createReducer } from '@reduxjs/toolkit';
import { fetchOffers, setActiveCity, fetchOffer, fetchReviews,
  setOffersDataLoadingStatus, requireAuthorization, setUserInfo, fetchNearestOffers,
  setNearestOffersLoadingStatus, setOfferLoadingStatus, setReviewsDataLoadingStatus, sendCommentStatus, fetchFavorites } from '../action';
import { CITIES_LOCATIONS, AuthorizationStatus } from '../../../const';
import { Offer, OfferPreview, City } from '../../../types/offer-types';
import { Review} from '../../../types/review-types';
import { UserData } from '../../../types/user-data';

const defaultCity = CITIES_LOCATIONS[0];

export type InitialState = {
  city: City | undefined;
  offers: OfferPreview[];
  fullOffer: Offer | null;
  nearestOffers: OfferPreview[];
  reviews: Review[];
  favorites: OfferPreview[];
  error: string | null;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  isFullOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isNearestOffersDataLoading: boolean;
  isCommentSend: boolean;
}

const initialState : InitialState = {
  city: defaultCity,
  offers: [],
  fullOffer: null,
  nearestOffers: [],
  reviews: [],
  favorites: [],
  error: null,
  isOffersDataLoading: false,
  authorizationStatus:AuthorizationStatus.Unknown,
  userInfo: null,
  isFullOfferDataLoading: false,
  isReviewsDataLoading: false,
  isNearestOffersDataLoading: false,
  isCommentSend: false,
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
      state.fullOffer = action.payload;
    })
    .addCase(fetchReviews, (state, action) => {
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
    })
    .addCase(fetchNearestOffers, (state, action) => {
      state.nearestOffers = action.payload;
    })
    .addCase(setNearestOffersLoadingStatus, (state, action) => {
      state.isNearestOffersDataLoading = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isFullOfferDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(sendCommentStatus, (state, action) => {
      state.isCommentSend = action.payload;
    })
    .addCase(fetchFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

