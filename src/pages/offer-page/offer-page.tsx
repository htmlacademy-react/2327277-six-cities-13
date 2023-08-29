import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-types';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { useState, useEffect } from 'react';
import Map from '../../components/map/map';
import { OffersList } from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header/header-logo';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFullOfferAction, fetchReviewsAction, fetchNearbyOffersAction } from '../../components/store/api-actions';
import { AuthorizationStatus, NEARBY_OFFERS_COUNT } from '../../const';
import { getFullOffer, getNearbyOffers, getIsFullOfferDataLoading, getIsNearbyOffersLoading } from '../../components/store/offers/offers-selectors';
import { getIsReviewsDataLoading } from '../../components/store/reviews/reviews-selectors';
import { getAuthorizationStatus } from '../../components/store/user-process/user-process-selectors';
import { DetailedOffer } from '../../components/detailed-offer/detailed-offer';

export default function OfferPage() {

  const [selectedOffer, setSelectedOffer] = useState<OfferPreview | undefined> (undefined);
  const dispatch = useAppDispatch();
  const currentId = String(useParams().id);
  const currentOffer = useAppSelector(getFullOffer);
  const isFullOfferLoaded = useAppSelector(getIsFullOfferDataLoading);
  const isReviewsLoaded = useAppSelector(getIsReviewsDataLoading);
  const nearbyOffersList = useAppSelector(getNearbyOffers);
  const isNearbyOffersLoaded = useAppSelector(getIsNearbyOffersLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (currentId) {
      dispatch(fetchFullOfferAction(currentId));
      dispatch(fetchReviewsAction(currentId));
      dispatch(fetchNearbyOffersAction(currentId));
    }
  }, [dispatch, currentId]);
  if (isFullOfferLoaded || isReviewsLoaded || isNearbyOffersLoaded) {
    return (
      <LoadingPage />
    );
  }
  if (!currentOffer){
    return <NotFoundPage/>;
  }

  const handleListItemHover = (id: string | undefined) => {
    const cityOffer = nearbyOffersList.find((offer) => offer.id === id);
    setSelectedOffer(cityOffer);
  };

  const nearbyOffers = nearbyOffersList.slice(0, NEARBY_OFFERS_COUNT);
  const offersMarkers = nearbyOffers && [...nearbyOffers, currentOffer];

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities: offers'}</title>
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <DetailedOffer offer={currentOffer}/>
              <section className="offer__reviews reviews">
                <ReviewsList/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={currentId}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              className='offer'
              offers={offersMarkers}
              city={currentOffer.city}
              selectedOffer={selectedOffer}
              currentOffer={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffers}
              onCardHover={handleListItemHover}
              isNear
            />
          </section>
        </div>
      </main>
    </div>
  );
}

