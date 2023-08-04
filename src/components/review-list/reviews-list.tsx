import { Review } from '../../types/review-types';
import { ReviewItem } from '../review-card/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

export function ReviewsList ({reviews}:ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

