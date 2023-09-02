import { Helmet } from 'react-helmet-async';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { useEffect } from 'react';
import Map from '../../components/map/map';
import { OffersList } from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFullOfferAction, fetchReviewsAction, fetchNearbyOffersAction } from '../../components/store/api-actions';
import { AuthorizationStatus, NEARBY_OFFERS_COUNT } from '../../const';
import { getFullOffer, getNearbyOffers, getIsFullOfferDataLoading, getIsNearbyOffersLoading } from '../../components/store/offers/offers-selectors';
import { getAuthorizationStatus } from '../../components/store/user-process/user-process-selectors';
import { DetailedOffer } from '../../components/detailed-offer/detailed-offer';
import { ImgContainer } from '../../components/img-container/img-container';

export default function OfferPage() {

  const dispatch = useAppDispatch();
  const currentId = String(useParams().id);
  const currentOffer = useAppSelector(getFullOffer);
  const isFullOfferLoaded = useAppSelector(getIsFullOfferDataLoading);
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
  if (isFullOfferLoaded || isNearbyOffersLoaded) {
    return (
      <LoadingPage />
    );
  }
  if (!currentOffer){
    return <NotFoundPage/>;
  }

  const nearbyOffers = nearbyOffersList.slice(0, NEARBY_OFFERS_COUNT);
  const offersMarkers = nearbyOffers && [...nearbyOffers, currentOffer];

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities: offers'}</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <ImgContainer images={currentOffer.images} />
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
              selectedOffer={undefined}
              currentOffer={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffers}
              isNear
            />
          </section>
        </div>
      </main>
    </div>
  );
}

