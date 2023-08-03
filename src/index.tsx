import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { offersList } from './mocks/offers-list';
import { reviews } from './mocks/reviews';
import { CITY } from './mocks/city';

const OFFERS_COUNT = 4;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT}
      offersList={offersList}
      offers={offers}
      reviews = {reviews}
      city = {CITY}
    />
  </React.StrictMode>
);
