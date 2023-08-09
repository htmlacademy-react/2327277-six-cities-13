import { OfferPreview } from './types/offer-types';

export function getOffersByCity (city: string | undefined, offers: OfferPreview[]): OfferPreview[]{
  return offers.filter((offer) => offer.city.name === city);
}

