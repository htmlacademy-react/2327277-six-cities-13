import { createReducer } from '@reduxjs/toolkit';
import { fetchOffers, setActiveCity, fetchOffer, fetchReview, setError, setOffersDataLoadingStatus } from '../action';
import { CITIES_LOCATIONS } from '../../../const';
import { Offer, OfferPreview, City } from '../../../types/offer-types';
import { Review } from '../../../types/review-types';

const defaultCity = CITIES_LOCATIONS[0];

type InitialState = {
  city: City | undefined;
  offers: OfferPreview[];
  fullOffers: Offer[];
  reviews: Review[];
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState : InitialState = {
  city: defaultCity,
  offers: [],
  fullOffers: [],
  reviews: [],
  error: null,
  isOffersDataLoading: false,
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

