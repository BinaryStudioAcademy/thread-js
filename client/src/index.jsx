import 'assets/css/styles.scss';

import { store } from 'packages/store/store';
import { App } from 'pages/app/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
