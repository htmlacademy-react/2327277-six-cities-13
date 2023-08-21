import { createAction } from '@reduxjs/toolkit';
import { OfferPreview, Offer, City} from '../../types/offer-types';
import { Review} from '../../types/review-types';
import { UserData } from '../../types/user-data';
import { AppRoute, AuthorizationStatus } from '../../const';

export const setActiveCity = createAction('offers/setActiveCity', (city: City) => ({payload: city}));

export const fetchOffers = createAction('offers/fetchOffers', (offers: OfferPreview[]) => ({payload: offers}));

export const fetchOffer = createAction('offer/fetchOffer', (fullOffer: Offer) => ({payload: fullOffer}));

export const fetchReviews = createAction('offer/reviews', (reviews: Review[]) => ({payload: reviews}));

export const fetchNearestOffers = createAction('offer/nearestOffers', (nearestOffers: OfferPreview[]) => ({payload: nearestOffers}));

export const setOffersDataLoadingStatus = createAction('setOffersDataLoadingStatus', (offersLoadingStatus: boolean)=> ({
  payload: offersLoadingStatus}));

export const setOfferLoadingStatus = createAction('setOfferLoadingStatus', (fullOfferLoadingStatus: boolean) => ({
  payload: fullOfferLoadingStatus}));

export const setReviewsDataLoadingStatus = createAction('setReviewsDataLoadingStatus', (reviewsLoadingStatus: boolean) => ({
  payload: reviewsLoadingStatus}));

export const setNearestOffersLoadingStatus = createAction('setNearestOffersLoadingStatus', (nearestOffersLoadingStatus: boolean) => ({
  payload: nearestOffersLoadingStatus}));

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setUserInfo = createAction('user/setUserInfo', (userInfo: UserData | null) => ({payload: userInfo}));

export const sendCommentStatus = createAction('sendCommentStatus',(newCommentStatus: boolean) => ({
  payload: newCommentStatus}));

export const fetchFavorites = createAction<OfferPreview[]>('favorites/fetch');
