import { configureStore } from '@reduxjs/toolkit';

import { http } from 'packages/http/http';
import { storage } from 'packages/storage/storage';
import { auth } from 'packages/auth/auth';
import { comment } from 'packages/comment/comment';
import { post } from 'packages/post/post';
import { image } from 'packages/image/image';
import { notification } from 'packages/notification/notification';
import { reducer as threadReducer } from 'slices/thread/thread';
import { reducer as profileReducer } from 'slices/profile/profile';
import { notificationSocket } from './middlewares/middlewares.js';

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
          image,
          notification
        }
      }
    }
  }).concat([notificationSocket])
});

export { store };
