import { OfferPreview } from './types/offer-types';
import { Sorting } from './types/sorting-types';
import { SortingMap } from './const';

export function getOffersByCity (city: string | undefined, offers: OfferPreview[]): OfferPreview[]{
  return offers.filter((offer) => offer.city.name === city);
}

export function sortOffersByType (offers: OfferPreview[], type: Sorting): OfferPreview[] {
  switch (type) {
    case SortingMap.PriceToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case SortingMap.PriceToLow:
      return offers.sort((a, b) => b.price - a.price);
    case SortingMap.TopRated:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}
