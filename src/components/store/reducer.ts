import { createReducer } from '@reduxjs/toolkit';
import { offersList } from '../../mocks/offers-list';
import { fetchOffers, setActiveCity } from './action';
import { CITIES_LOCATIONS } from '../../const';

const defaultCity = CITIES_LOCATIONS[0];

const initialState = {
  city: defaultCity,
  offers: offersList,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    });
});
