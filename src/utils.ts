import { OfferPreview } from './types/offer-types';
import { Review } from './types/review-types';
import { Sorting } from './types/sorting-types';
import { SortingMap } from './const';
import { MAX_REVIEWS_AMOUNT } from './const';

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

function compare(a: Review, b: Review) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return Number(dateB) - Number(dateA);
}

export function sortReviewByDate(reviews: Review[]): Review[] {
  return reviews.slice().sort(compare).slice(0, MAX_REVIEWS_AMOUNT);
}

export function getRandomArrayElement<City>(array: City[]): City {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}


