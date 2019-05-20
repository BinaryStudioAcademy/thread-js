import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routing from 'src/containers/Routing';
import store, { history } from 'src/store';

const Home = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routing />
        </ConnectedRouter>
    </Provider>
);

export default Home;
