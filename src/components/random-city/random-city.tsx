import { getRandomArrayElement } from '../../utils';
import { CITIES_LOCATIONS } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../store/offers/offers-slice';
import { memo } from 'react';

const RandomCity = () => {
  const dispatch = useAppDispatch();
  const randomCity = getRandomArrayElement(CITIES_LOCATIONS);

  const handleButtonClick = () => {
    if(randomCity !== undefined){
      dispatch(setActiveCity(randomCity));
    }
  };

  return (
    <div className="locations__item">
      <Link className="locations__item-link" to={AppRoute.Root} onClick={handleButtonClick}>
        <span>{randomCity.name}</span>
      </Link>
    </div>
  );
};

export const RandomCityButton = memo(RandomCity);
