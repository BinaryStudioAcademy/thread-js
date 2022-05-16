import { configureStore } from '@reduxjs/toolkit';

import * as services from 'services/services.js';
import { profileReducer, threadReducer } from './root-reducer.js';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  },
  middleware: getDefaultMiddleware => (getDefaultMiddleware({
    thunk: {
      extraArgument: { services }
    }
  }))
});

export default store;
