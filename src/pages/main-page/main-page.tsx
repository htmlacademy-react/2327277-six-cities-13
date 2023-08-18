import { OffersList } from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-types';
import Map from '../../components/map/map';
import { useState } from 'react';
import { CitiesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffers } from '../../components/sorting/sorting';
import { Sorting } from '../../types/sorting-types';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header/header-logo';

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
