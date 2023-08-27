import { FavoritesCard } from './favorites-card';
import { OfferPreview } from '../../types/offer-types';
import { Link } from 'react-router-dom';

type FavoritesCardListProps = {
  favoriteOffers: OfferPreview[];
}

export function FavoritesList ({favoriteOffers}: FavoritesCardListProps) {
  const favoriteCities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  return (
    <ul className="favorites__list">
      {Array.from(favoriteCities.values()).map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {
              favoriteOffers.filter((offer) =>
                offer.city.name === city).map((offer) =>
                <FavoritesCard key={offer.id} offer={offer} />)
            }
          </div>
        </li>
      ))}
    </ul>
  );
}
