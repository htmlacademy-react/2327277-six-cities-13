import { createAction } from '@reduxjs/toolkit';
import { OfferPreview, City} from '../../types/offer-types';

export const setActiveCity = createAction('offers/changeCity', (city: City) => ({payload: city}));

export const fetchOffers = createAction('offers/offersCityList', (offers: OfferPreview[]) => ({payload: offers}));
