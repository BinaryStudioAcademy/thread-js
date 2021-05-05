import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import threadReducer from './containers/Thread/reducer';
import profileReducer from './containers/Profile/reducer';

const rootReducer = combineReducers({
  posts: threadReducer,
  profile: profileReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
