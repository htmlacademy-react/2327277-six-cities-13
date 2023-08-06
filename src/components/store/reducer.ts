import { createReducer } from '@reduxjs/toolkit';
import { Offer, OfferPreview, City } from '../../types/offer-types';
import { Review } from '../../types/review-types';
import { offers } from '../../mocks/offers';
import { reviews } from '../../mocks/reviews';
import { CityMap } from '../../const';
import { fetchOffers, fetchFavorites, fetchNearPlaces, fetchOffer, fetchReviews, setActiveCity, dropOffer } from './action';

const initialState: {
  offers: OfferPreview[];
  nearPlaces: OfferPreview[];
  reviews: Review[];
  offer: Offer| null;
  favorites: OfferPreview[];
  activeCity:City;
} = {
  offers,
  nearPlaces:[],
  reviews:[],
  offer:null,
  favorites:[],
  activeCity: 'Paris',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = offers.find((offer)=>offer.id === action.payload) ?? null;
    })
    .addCase(fetchNearPlaces, (state, action) => {
      state.nearPlaces = offers.filter((offer)=>offer.id !== action.payload);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearPlaces = [];
    })
    .addCase(setActiveCity, (state,action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchFavorites, (state) => {
      state.favorites = state.offers.filter((offer)=>offer.isFavorite);
    });
});
