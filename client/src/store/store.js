import { configureStore } from '@reduxjs/toolkit';

import threadReducer from '../containers/Thread/reducer';
import profileReducer from '../containers/Profile/reducer';

const store = configureStore({
  reducer: {
    posts: threadReducer,
    profile: profileReducer
  }
});

export default store;
