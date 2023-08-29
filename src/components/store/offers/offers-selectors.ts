import { State } from '../../../types/state';
import { NameSpace } from '../../../const';
import { OfferPreview, Offer, City } from '../../../types/offer-types';

export const getOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].offers;
export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getFullOffer = (state: State): Offer | null => state[NameSpace.Offers].fullOffer;
export const getIsFullOfferDataLoading = (state: State): boolean => state[NameSpace.Offers].isFullOfferDataLoading;
export const getNearbyOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].nearbyOffers;
export const getIsNearbyOffersLoading = (state: State): boolean => state[NameSpace.Offers].isNearbyOffersLoading;
export const getActiveCity = (state: State): City | undefined => state[NameSpace.Offers].city;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
export const getFavoriteOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].favoriteOffers;
export const isFavoriteOffersLoading = (state: State): boolean => state[NameSpace.Offers].isFavoriteOffersLoading;

