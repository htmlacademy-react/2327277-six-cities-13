import { OffersList } from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-types';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import Map from '../../components/map/map';
import { useState } from 'react';
import { CitiesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffers } from '../../components/sorting/sorting';
import { Sorting } from '../../types/sorting-types';

export default function MainPage() {
  const selectedCity = useAppSelector((state) => state.city);
  const offersList = useAppSelector((state) => state.offers);
  const selectedCityOffers = getOffersByCity(selectedCity?.name, offersList);

  const [selectedOffer, setSelectedOffer] = useState<OfferPreview | undefined>(undefined);
  const [activeSort, setActiveSort] = useState<Sorting>('Popular');
  const handleListItemHover = (id: string) => {
    const currentPoint = offersList.find((offer) => offer.id === id);
    setSelectedOffer(currentPoint);
  };
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities: main page'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              selectedCity={selectedCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found"> {selectedCityOffers.length} places to stay in {selectedCity?.name}</b>
              <SortOffers
                activeSorting={activeSort}
                onChange={(newSorting) => setActiveSort(newSorting)}
              />
              <OffersList
                offers={sortOffersByType(selectedCityOffers, activeSort)}
                onCardHover = {handleListItemHover}
                isNear={false}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={selectedCityOffers}
                city={selectedCity}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
