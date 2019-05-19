import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './containers/App';

import './styles/reset.scss';
import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

const target = document.getElementById('root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    target
);
