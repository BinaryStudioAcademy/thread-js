import { configureStore } from '@reduxjs/toolkit';

import threadReducer from '../containers/Thread/reducer';
import { profileReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  }
});

export default store;
