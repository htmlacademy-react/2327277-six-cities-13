import Card from '../card/card';
import { OfferPreview } from '../../types/offer-types';

type OffersListProps = {
  offers: OfferPreview[];
}

export function OffersList({offers}: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<Card key={offer.id} offer={offer}/>)
      )}
    </div>
  );
}
