import { FavoritesCard } from './favorites-card';
import { OfferPreview } from '../../types/offer-types';

type FavoritesListProps = {
  offers:OfferPreview[];
  cities : string[];
}

export function FavoritesList({offers, cities}:FavoritesListProps) {
  return(
    <>
      {cities.map((city, i) => (
        <li className="favorites__locations-items" key={ offers[i].id }>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href='#'>
                <span>{ city }</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            { offers.filter((item) => item.city.name === city).map((item) => (
              <FavoritesCard key={ item.id } offers = {item}/>
            ))}
          </div>
        </li>
      ))}
    </>
  );
}

