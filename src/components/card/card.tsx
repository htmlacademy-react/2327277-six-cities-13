import { OfferPreview } from '../../types/offer-types';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MouseEvent } from 'react';
import classNames from 'classnames';
import { BookmarkButton } from '../bookmark-button/bookmark-button';

type CardProps = {
  offer: OfferPreview;
  onCardHover?: (id: string) => void;
  isNear:boolean;
}

export default function Card({offer, onCardHover, isNear}:CardProps) {
  const {id, title, type, price, previewImage, isPremium, rating} = offer;
  const [, setOfferId] = useState('');
  const [activeFavorite, setActiveFavorite] = useState(offer.isFavorite);
  const handleCardHover = (event: MouseEvent<HTMLLIElement>) => {
    if (onCardHover === undefined) {
      return;
    }
    event.preventDefault();
    setOfferId(id);
    onCardHover(id);
  };
  const handleCardOut = (event: MouseEvent<HTMLLIElement>) => {
    if (onCardHover === undefined) {
      return;
    }
    event.preventDefault();
    setOfferId('');
    onCardHover('');
  };
  return (
    <article
      className={classNames(
        {'near-places__card': isNear},
        {'cities__card': !isNear},
        'place-card'
      )}
      onMouseOver={handleCardHover} onMouseOut={handleCardOut}
    >
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div
        className={classNames(
          {'near-places__image-wrapper': isNear},
          {'cities__image-wrapper': !isNear},
          'place-card__image-wrapper'
        )}
      >
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton id={id} isFavorite={activeFavorite} isDetailed = {false} onClick={() => setActiveFavorite((prev) => !prev)}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ Math.round(rating) * 100 / 5}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
