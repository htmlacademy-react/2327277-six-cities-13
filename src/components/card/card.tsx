import { OfferPreview } from '../../types/offer-types';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MouseEvent } from 'react';


type CardProps = {
  offer: OfferPreview;
  onCardHover: (id: string) => void;
}

export default function Card({offer, onCardHover}:CardProps) {
  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const [, setOfferId] = useState('');
  const handleCardHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setOfferId(id);
    onCardHover(id);
  };
  const handleCardOut = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setOfferId('');
    onCardHover('');
  };
  return (
    <article className="cities__card place-card" onMouseOver={handleCardHover} onMouseOut={handleCardOut}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <button className={`place-card__bookmark-button${isFavorite ? '--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
