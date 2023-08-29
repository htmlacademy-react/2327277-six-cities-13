import { useAppSelector } from '../../hooks';
import { sortReviewByDate } from '../../utils';
import { ReviewItem } from '../review-card/review-card';
import { getReviews } from '../store/reviews/reviews-selectors';

export function ReviewsList() {

  const reviews = useAppSelector(getReviews);

  return (
    <>
      <h2 className="reviews__title">
        Reviews {' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortReviewByDate(reviews).map((item) => (
          <li className="reviews__item" key={item.id}>
            <ReviewItem review={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
