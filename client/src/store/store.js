import { configureStore } from '@reduxjs/toolkit';

import { http, storage, auth, comment, post, image } from 'services/services';
import { profileReducer, threadReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        services: {
          http,
          storage,
          auth,
          comment,
          post,
          image
        }
      }
    }
  })
});

export default store;
