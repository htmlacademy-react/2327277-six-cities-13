import { createAction } from '@reduxjs/toolkit/dist/createAction';
import { Offer, City } from '../../types/offer-types';
import { NameSpace} from '../../const';

export const fetchOffers = createAction(`${NameSpace.Offers}/fetchOffers`);
export const fetchOffer = createAction<Offer['id']>(`${NameSpace.Offer}/fetchOffer`);
export const fetchNearPlaces = createAction<Offer['id']>(`${NameSpace.NearPlaces}/fetchNearPlaces`);
export const fetchReviews = createAction<Offer['id']>(`${NameSpace.Reviews}/fetchReviews`);
export const fetchFavorites = createAction(`${NameSpace.Favorites}/fetchFavorites`);
export const dropOffer = createAction(`${NameSpace.Offer}/dropOffer`);
export const setActiveCity = createAction<City>(`${NameSpace.Offers}/setActiveCity`);
