import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { offersList } from './mocks/offers-list';
import { reviews } from './mocks/reviews';
import { store } from './components/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersList={offersList}
        offers={offers}
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>
);
