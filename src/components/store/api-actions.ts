import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../types/state';
import { Offer, OfferPreview } from '../../types/offer-types';
import { saveToken, dropToken } from '../services/token';
import { Review, Comment } from '../../types/review-types';
import { UserData } from '../../types/user-data';
import { APIRoute, FavoriteStatus } from '../../const';
import { AuthData } from '../../types/auth-data';
import { NameSpace } from '../../const';


export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchFullOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadFullOffer',
  async (id, {extra: api}) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/reviewsList',
  async (id, {extra: api}) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferPreview[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/nearbyOffersList',
  async (id, {extra: api}) => {
    const { data } = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id}${APIRoute.NearbyOffers}`);
    return data;
  },
);

export const postCommentAction = createAsyncThunk<Review, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendCommentStatus',
  async ({comment, rating, id}, {extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

// export const fetchFavoriteOffersAction = createAsyncThunk<OfferPreview[], undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'data/favoriteOffersList',
//   async (_arg, {extra: api}) => {
//     const { data } = await api.get<OfferPreview[]>(`${APIRoute.Favorites}`);
//     return data;
//   },
// );

// export const changeFavoritesStatusAction = createAsyncThunk<OfferPreview, FavoritesStatusData, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'data/changeFavoritesStatus',
//   async ({id, isFavorite}, {extra: api}) => {
//     const { data } = await api.post<OfferPreview>(`${APIRoute.Favorites}/${id}/${+isFavorite}`);
//     return data;
//   }
// );

export const fetchFavoritesAction = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Favorites);

    return data;
  }
);

export const addFavorite = createAsyncThunk<OfferPreview, OfferPreview['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/addFavorite`,
  async (id, {extra: api}) => {
    const {data} = await api.post<OfferPreview>(`${APIRoute.Favorites}/${id}/${FavoriteStatus.Add}`);

    return data;
  }
);

export const deleteFavorite = createAsyncThunk<OfferPreview, OfferPreview['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/deleteFavorite`,
  async (id, {extra: api}) => {
    const {data} = await api.post<OfferPreview>(`${APIRoute.Favorites}/${id}/${FavoriteStatus.Delete}`);

    return data;
  }
);
