import { OffersList } from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-types';
import Map from '../../components/map/map';
import { useState, useCallback, useMemo } from 'react';
import { CitiesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffers } from '../../components/sorting/sorting';
import { Sorting } from '../../types/sorting-types';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header/header-logo';
import { getActiveCity, getOffers } from '../../components/store/offers/offers-selectors';
import { MainPageEmpty } from './main-page-empty';

export default function MainPage() {
  const selectedCity = useAppSelector(getActiveCity);
  const offersList = useAppSelector(getOffers);
  const selectedCityOffers = useMemo(() => getOffersByCity(selectedCity?.name, offersList), [selectedCity, offersList]);
  const [selectedOffer, setSelectedOffer] = useState<OfferPreview | undefined>(undefined);
  const [activeSort, setActiveSort] = useState<Sorting>('Popular');
  const isEmpty = offersList.length === 0;

  const handleListItemHover = useCallback((id: string) => {
    const currentPoint = offersList.find((offer) => offer.id === id);
    setSelectedOffer(currentPoint);
  },[offersList]);
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities: main page'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <HeaderLogo />
            </div>
            <Header/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          {isEmpty ? <MainPageEmpty/> :
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
                  className='cities'
                  offers={selectedCityOffers}
                  city={selectedCity}
                  selectedOffer={selectedOffer}
                />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}
