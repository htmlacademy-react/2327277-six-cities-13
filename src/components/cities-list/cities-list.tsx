import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../store/action';
import { AppRoute, CITIES_LOCATIONS } from '../../const';
import { City } from '../../types/offer-types';

type citiesListProps = {
  selectedCity: City| undefined;
}

export function CitiesList({ selectedCity}: citiesListProps) {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      { CITIES_LOCATIONS.map((city) => (
        <li
          key={ city.name }
          className="locations__item"
          onClick={ () => {
            dispatch(setActiveCity(city));
          }}
        >
          <Link className={`${city.name === selectedCity?.name ? 'tabs__item--active' : 'tabs__item--disable'} locations__item-link tabs__item`}
            to={AppRoute.Root}
          >
            <span>{ city.name }</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
