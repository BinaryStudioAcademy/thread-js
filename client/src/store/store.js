import { configureStore } from '@reduxjs/toolkit';

import * as services from 'services/services';
import { profileReducer, threadReducer } from './root-reducer';

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
