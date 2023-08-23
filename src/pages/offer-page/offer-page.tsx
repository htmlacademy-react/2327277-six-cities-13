import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer-types';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/review-list/reviews-list';
import { useState } from 'react';
import Map from '../../components/map/map';
import { OffersList } from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header/header-logo';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFullOfferAction, fetchReviewsAction, fetchNearbyOffersAction } from '../../components/store/api-actions';
import { AuthorizationStatus } from '../../const';
import { getFullOffer, getNearbyOffers, isFullOfferDataLoading, isNearbyOffersLoading } from '../../components/store/offers/offers-selectors';
import { isReviewsDataLoading } from '../../components/store/reviews/reviews-selectors';
import { getAuthorizationStatus } from '../../components/store/user-process/user-process-selectors';

export default function OfferPage() {

  const [selectedOffer, setSelectedOffer] = useState<OfferPreview | undefined> (undefined);
  const dispatch = useAppDispatch();
  const currentId = String(useParams().id);
  const currentOffer = useAppSelector(getFullOffer);
  const isFullOfferLoaded = useAppSelector(isFullOfferDataLoading);
  const isReviewsLoaded = useAppSelector(isReviewsDataLoading);
  const nearbyOffersList = useAppSelector(getNearbyOffers).slice(0, 3);
  const isNearbyOffersLoaded = useAppSelector(isNearbyOffersLoading);
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
              {currentOffer.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(currentOffer.rating) * 100 / 5}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value"> {currentOffer.rating} </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {currentOffer.maxAdults}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper offer__avatar-wrapper${currentOffer.host.isPro ? '--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={currentId}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              className='offer'
              offers={nearbyOffersList}
              city={currentOffer.city}
              selectedOffer={selectedOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffersList}
              onCardHover={handleListItemHover}
              isNear
            />
          </section>
        </div>
      </main>
    </div>
  );
}
