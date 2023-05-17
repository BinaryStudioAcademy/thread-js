import { configureStore } from '@reduxjs/toolkit';

import { http } from 'packages/http/http.js';
import { storage } from 'packages/storage/storage.js';
import { auth } from 'packages/auth/auth.js';
import { comment } from 'packages/comment/comment.js';
import { post } from 'packages/post/post.js';
import { image } from 'packages/image/image.js';
import { notification } from 'packages/notification/notification.js';
import { profileReducer, threadReducer } from './root-reducer.js';
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
