import { NameSpace, RequestStatus } from '../../../const';
import { Review } from '../../../types/review-types';
import { State } from '../../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getSendingCommentStatus = (state: State): RequestStatus => state[NameSpace.Reviews].sendingCommentStatus;
