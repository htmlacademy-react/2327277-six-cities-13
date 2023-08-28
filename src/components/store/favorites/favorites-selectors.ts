import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { FavoritesData, State } from '../../../types/state';

export const getFavorites = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.favorites
);

export const getFavoritesFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.fetchingStatusFavorites
);

export const getFavoriteCities = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => [... new Set(state.favorites.map(({city}) => city.name))],
);
