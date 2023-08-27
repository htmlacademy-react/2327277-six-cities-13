import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {OfferPreview} from '../../types/offer-types';
import { addFavorite, deleteFavorite } from '../store/api-actions';
import { getAuthorizationStatus } from '../store/user-process/user-process-selectors';
import classNames from 'classnames';

type BookmarkButtonProps = {
  id: OfferPreview['id'];
  isFavorite: OfferPreview['isFavorite'];
  isDetailed?: boolean;
  onClick: () => void;
}

export function BookmarkButton({id, isFavorite, isDetailed, onClick}: BookmarkButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }

    onClick();

    if (isFavorite) {
      dispatch(deleteFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  return (
    <button className={classNames({
      'place-card__bookmark-button button': true,
      'place-card__bookmark-button--active': isFavorite
    })}
    type="button"
    onClick={handleBookmarkButtonClick}
    >
      <svg className="place-card__bookmark-icon" width={isDetailed ? 31 : 18} height={isDetailed ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
