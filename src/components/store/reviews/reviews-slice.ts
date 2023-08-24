import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { fetchReviewsAction, postCommentAction } from '../api-actions';
import { Reviews } from '../../../types/state';

const initialState: Reviews = {
  reviews: [],
  isReviewsDataLoading: false,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});
