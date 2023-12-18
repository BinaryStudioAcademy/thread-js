import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '~/libs/packages/store/store.js';
import { App } from '~/pages/app/app.js';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store.instance}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
