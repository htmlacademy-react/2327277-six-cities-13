import Card from '../card/card';
import { OfferPreview } from '../../types/offer-types';

type OffersListProps = {
  offers: OfferPreview[];
  onCardHover: (id: string) => void;
}

export function OffersList({offers, onCardHover}: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<Card key={offer.id} offer={offer} onCardHover={onCardHover}/>)
      )}
    </div>
  );
}
