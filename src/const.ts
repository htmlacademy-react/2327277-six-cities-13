import { City } from './types/offer-types';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/404',
  }

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES_LOCATIONS: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
];

export const SortingMap = {
  Popular : 'Popular',
  PriceToHigh : 'Price: low to high',
  PriceToLow : 'Price: high to low',
  TopRated : 'Top rated first',
};

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  NotFound = '/404',
  Reviews = '/comments',
  NearbyOffers = '/nearby',
}

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Favorites = 'FAVORITES',
  Offer = 'OFFER',
  Reviews = 'REVIEWS',
  NearPlaces = 'NEAR_PLACES',
}

export enum RequestStatus {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export enum FavoriteStatus {
  Add = 1,
  Delete = 0,
}

export const NEARBY_OFFERS_COUNT = 3;

export const MIN_COMMENTS_LENGTH = 50;

export const MAX_COMMENTS_LENGTH = 300;

export const MAX_RATING = 5;

export const MAX_REVIEWS_AMOUNT = 10;

export const MAX_IMAGES_COUNT = 6;

export const OFFER_TYPES = {
  apartment: 'Apartment',
  room: 'Private room',
  house: 'House',
  hotel: 'Hotel'} as const;
