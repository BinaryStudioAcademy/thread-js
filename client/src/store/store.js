import { configureStore } from '@reduxjs/toolkit';

import { profileReducer, threadReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  }
});

export default store;
