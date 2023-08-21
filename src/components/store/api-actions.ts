import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { Offer, OfferPreview } from '../../types/offer-types';
import { UserData } from '../../types/user-data';
import { Review, Comment} from '../../types/review-types';
import { AppRoute, APIRoute, AuthorizationStatus } from '../../const';
import { dropToken, saveToken } from '../services/token';
import {
  fetchOffers, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute,
  setUserInfo, setOfferLoadingStatus, fetchOffer, fetchReviews,
  setReviewsDataLoadingStatus,fetchNearestOffers, setNearestOffersLoadingStatus, fetchFavorites
} from './action';
import { AuthData } from '../../types/auth-data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(fetchOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
    dispatch(setUserInfo(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserInfo(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOfferLoadingStatus(true));
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    dispatch(setOfferLoadingStatus(false));
    dispatch(fetchOffer(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    dispatch(setReviewsDataLoadingStatus(true));
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(setReviewsDataLoadingStatus(false));
    dispatch(fetchReviews(data));
  },
);

export const fetchNearestOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/nearbyOffersList',
  async (id, {dispatch, extra: api}) => {
    dispatch(setNearestOffersLoadingStatus(true));
    const { data } = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id}${APIRoute.NearbyOffers}`);
    dispatch(setNearestOffersLoadingStatus(false));
    dispatch(fetchNearestOffers(data));
  },
);

export const postCommentAction = createAsyncThunk<Review, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({comment, rating, id}, {extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/favorites',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Favorites);
    dispatch(fetchFavorites(data));
  },
);
