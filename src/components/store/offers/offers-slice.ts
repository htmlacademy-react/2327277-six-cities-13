import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, CITIES_LOCATIONS } from '../../../const';
import { fetchOffersAction, fetchFullOfferAction, fetchNearbyOffersAction } from '../api-actions';
import { OffersProcess } from '../../../types/state';
import { City, FavoritesStatusData } from '../../../types/offer-types';

const defaultCity = CITIES_LOCATIONS[0];

const initialState : OffersProcess = {
  city: defaultCity,
  offers: [],
  fullOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  isOffersDataLoading: false,
  isFullOfferDataLoading: false,
  isNearbyOffersLoading: false,
  isFavoriteOffersLoading: false,
  hasError: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
    updateFavoriteOffer: (state, action: PayloadAction<FavoritesStatusData>) => {
      const currentOfferIndex = state.offers.findIndex(
        (offer) => offer.id === action.payload.id
      );
      state.offers[currentOfferIndex].isFavorite = action.payload.isFavorite;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFullOfferAction.pending, (state) => {
        state.isFullOfferDataLoading = true;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.isFullOfferDataLoading = false;
      })
      .addCase(fetchFullOfferAction.rejected, (state) => {
        state.isFullOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isNearbyOffersLoading = false;
      });
  },
});

export const {setActiveCity, updateFavoriteOffer} = offersData.actions;
