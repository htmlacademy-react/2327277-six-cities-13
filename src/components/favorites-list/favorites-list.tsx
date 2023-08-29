import { FavoritesCard } from '../favorites-card/favorites-card';
import { OfferPreview } from '../../types/offer-types';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFavoriteCities } from '../store/favorites/favorites-selectors';

type FavoritesCardListProps = {
  favoriteOffers: OfferPreview[];
}

export function FavoritesList ({favoriteOffers}: FavoritesCardListProps) {
  const favoriteCities = useAppSelector(getFavoriteCities);

  return (
    <ul className="favorites__list">
      {favoriteCities.map((city) => (
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
              favoriteOffers
                .filter((offer) => offer.city.name === city)
                .map((offer) => <FavoritesCard key={offer.id} offer={offer} />)
            }
          </div>
        </li>
      ))}
    </ul>
  );
}
