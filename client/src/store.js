
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import postReducer from './components/post/logic/postReducer';
import profileReducer from './components/profile/logic/profileReducer';

export const history = createBrowserHistory();

const initialState = {};

const middlewares = [
    thunk,
    routerMiddleware(history)
];

const composedEnhancers = compose(
    applyMiddleware(...middlewares)
);

const reducers = {
    posts: postReducer,
    profile: profileReducer,
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers
});

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;
