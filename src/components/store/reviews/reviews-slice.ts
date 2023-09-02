import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../../const';
import { fetchReviewsAction, postCommentAction } from '../api-actions';
import { Reviews } from '../../../types/state';

const initialState: Reviews = {
  reviews: [],
  sendingCommentStatus: RequestStatus.Unsent
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    dropSendingStatus: (state) => {
      state.sendingCommentStatus = RequestStatus.Unsent;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.sendingCommentStatus = RequestStatus.Pending;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.sendingCommentStatus = RequestStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.sendingCommentStatus = RequestStatus.Error;
      });
  }
});

export const {dropSendingStatus} = reviewsData.actions;
