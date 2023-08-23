import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { offersData } from './offers/offers-slice';
import { reviewsData } from './reviews/reviews-slice';
import { userProcess } from './user-process/user-process-slice';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
