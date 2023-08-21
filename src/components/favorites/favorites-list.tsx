import { FavoritesCard } from './favorites-card';
import { OfferPreview } from '../../types/offer-types';

type FavoritesListProps = {
  city: string;
  favoriteOffers: OfferPreview[];
}

export function FavoritesList({city, favoriteOffers}: FavoritesListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffers.map((offer) => <FavoritesCard key={offer.id} offer={offer} />)}
      </div>
    </li>
  );
}

