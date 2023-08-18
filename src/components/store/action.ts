import { createAction } from '@reduxjs/toolkit';
import { OfferPreview, Offer, City} from '../../types/offer-types';
import { Review } from '../../types/review-types';
import { UserData } from '../../types/user-data';
import { AppRoute, AuthorizationStatus } from '../../const';

export const setActiveCity = createAction('offers/setActiveCity', (city: City) => ({payload: city}));

export const fetchOffers = createAction('offers/fetchOffers', (offers: OfferPreview[]) => ({payload: offers}));

export const fetchOffer = createAction('offers/fetchOffer', (fullOffers: Offer[]) => ({payload: fullOffers}));

export const fetchReview = createAction('offers/reviews', (reviews: Review[]) => ({payload: reviews}));

export const setOffersDataLoadingStatus = createAction('setOffersDataLoadingStatus', (offersLoadingStatus: boolean)=> ({
  payload: offersLoadingStatus}));

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setUserInfo = createAction('user/setUserInfo', (userInfo: UserData | null) => ({payload: userInfo}));


