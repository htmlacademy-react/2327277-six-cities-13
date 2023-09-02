import { FormEvent, ChangeEventHandler, useState , Fragment, useEffect } from 'react';
import { postCommentAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MIN_COMMENTS_LENGTH, MAX_COMMENTS_LENGTH, RequestStatus } from '../../const';
import { getSendingCommentStatus } from '../store/reviews/reviews-selectors';
import { dropSendingStatus } from '../store/reviews/reviews-slice';

type ReviewFormProps = {
  offerId: string;
}

export function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {

  const ratingMap = {
    '5': 'perfect',
    '4': 'good',
    '3': 'not bad',
    '2': 'badly',
    '1': 'terribly',
  };

  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const reviewStatus = useAppSelector(getSendingCommentStatus);

  const isValid = rating !== 0
    && comment.length >= MIN_COMMENTS_LENGTH
    && comment.length <= MAX_COMMENTS_LENGTH;

  useEffect(() => {
    if (reviewStatus === RequestStatus.Success) {
      setComment('');
      setRating(0);
      dispatch(dropSendingStatus());
    }
  }, [dispatch, reviewStatus]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }): void => {
    setRating(Number(target.value));
  };

  const handleTexAreaChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }): void => {
    setComment(target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isValid) {
      dispatch(postCommentAction({
        id: offerId,
        comment: comment,
        rating: rating,
      }));
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit} >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={Number(rating) === Number(score)}
                onChange={handleInputChange}
                disabled={reviewStatus === RequestStatus.Pending}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleTexAreaChange}
        disabled={reviewStatus === RequestStatus.Pending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENTS_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || reviewStatus === RequestStatus.Success}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
