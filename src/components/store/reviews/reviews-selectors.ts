import { NameSpace } from '../../../const';
import { Review } from '../../../types/review-types';
import { State } from '../../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getIsReviewsDataLoading = (state: State): boolean => state[NameSpace.Reviews].isReviewsDataLoading;
