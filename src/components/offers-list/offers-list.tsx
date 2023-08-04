import Card from '../card/card';
import { OfferPreview } from '../../types/offer-types';
import classNames from 'classnames';

type OffersListProps = {
  offers: OfferPreview[];
  onCardHover: (id: string) => void;
  isNear: boolean;
}

export function OffersList({offers, onCardHover, isNear}: OffersListProps) {
  return (
    <div
      className={classNames(
        {'near-places__list': isNear},
        {'cities__places-list': !isNear},
        'places__list',
        {'tabs__content': !isNear}
      )}
    >
      {offers.map((offer) => (<Card key={offer.id} offer={offer} onCardHover={onCardHover} isNear={isNear}/>)
      )}
    </div>
  );
}
