import { configureStore } from '@reduxjs/toolkit';

import {
  http,
  storage,
  auth,
  comment,
  post,
  image,
  notification
} from '../services/services';
import { profileReducer, threadReducer } from './root-reducer';
import { notificationSocket } from './middlewares/middlewares';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          services: {
            http,
            storage,
            auth,
            comment,
            post,
            image,
            notification
          }
        }
      }
    }).concat([notificationSocket])
});

export { store };
