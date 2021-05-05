import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from 'src/containers/Routing';
import store from 'src/store/store';

import './styles/reset.scss';
import 'semantic-ui-css/semantic.min.css';
import './styles/common.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routing />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
