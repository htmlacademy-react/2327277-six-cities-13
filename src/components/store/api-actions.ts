import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { OfferPreview } from '../../types/offer-types';
import { UserData } from '../../types/user-data';
// import { Offer, OfferPreview } from '../../types/offer-types';
// import { Review, UserData } from '../../types/review-types';
import { AppRoute, APIRoute, AuthorizationStatus } from '../../const';
import { dropToken, saveToken } from '../services/token';
import {fetchOffers, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute, setUserInfo} from './action';
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


// export const fetchOfferAction = createAsyncThunk<void, string, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'OFFER/fetch',
//   async (offerId, {dispatch, extra: api}) => {
//     try {
//       dispatch(setOfferDataLoadingStatus(true));
//       const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}`);
//       dispatch(setOfferDataLoadingStatus(false));
//       dispatch(fetchOffer(data));
//     } catch {
//       dispatch(setOfferDataLoadingStatus(true));
//       dispatch(redirectToRoute(AppRoute.NotFound));
//       dispatch(setOfferDataLoadingStatus(false));
//     }
//   },
// );

// export const fetchNeigbouhoodOffersAction = createAsyncThunk<void, string, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'NEIGBOUHOOD/fetch',
//   async (offerId, {dispatch, extra: api}) => {
//     try {
//       dispatch(setOffersNeighbouhoodLoading(true));
//       const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
//       dispatch(setOffersNeighbouhoodLoading(false));
//       dispatch(fetchNeigbouhoodOffers(data));
//     } catch {
//       dispatch(setOffersNeighbouhoodLoading(true));
//       dispatch(redirectToRoute(AppRoute.NotFound));
//       dispatch(setOffersNeighbouhoodLoading(false));
//     }
//   },
// );

// export const fetchReviewsOfferAction = createAsyncThunk<void, string, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'REVIEWS/fetch',
//   async (offerId, { dispatch, extra: api }) => {
//     try {
//       dispatch(setReviewsDataLoadingStatus(true));
//       const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
//       dispatch(setReviewsDataLoadingStatus(false));
//       dispatch(loadReviews(data));
//     } catch {
//       dispatch(setReviewsDataLoadingStatus(true));
//       dispatch(redirectToRoute(AppRoute.NotFound));
//       dispatch(setReviewsDataLoadingStatus(false));
//     }
//   }
// );

// export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'FAVORITES/fetch',
//   async (_arg, { dispatch, extra: api }) => {
//     try {
//       const { data } = await api.get<Offer[]>(APIRoute.Favorites);
//       dispatch(fetchFavorites(data));
//     } catch {
//       throw new Error();
//     }
//   });
