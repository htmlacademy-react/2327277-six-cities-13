import { useAppSelector } from '../../hooks';
import { sortReviewByDate } from '../../utils';
import { ReviewItem } from '../review-card/review-item';

export function ReviewsList() {

  const reviews = useAppSelector((store) => store.reviews);

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
