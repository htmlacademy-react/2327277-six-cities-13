import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, CITIES_LOCATIONS } from '../../const';
import { City } from '../../types/offer-types';
import { setActiveCity } from '../store/offers/offers-slice';
import { getActiveCity } from '../store/offers/offers-selectors';
import { MouseEvent, memo, useCallback } from 'react';


const CitiesListComponent = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getActiveCity);
  const handleCityClick = useCallback((city: City) => (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {CITIES_LOCATIONS.map((city) => (
        <li
          key={city.name}
          className="locations__item"
          onClick = {handleCityClick(city)}
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
};

export const CitiesList = memo(CitiesListComponent);


