import { configureStore } from '@reduxjs/toolkit';

import { auth } from '~/packages/auth/auth.js';
import { comment } from '~/packages/comment/comment.js';
import { http } from '~/packages/http/http.js';
import { image } from '~/packages/image/image.js';
import { notification } from '~/packages/notification/notification.js';
import { post } from '~/packages/post/post.js';
import { storage } from '~/packages/storage/storage.js';
import { reducer as profileReducer } from '~/slices/profile/profile.js';
import { reducer as threadReducer } from '~/slices/thread/thread.js';

import { notificationSocket } from './middlewares/middlewares.js';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
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
    }),
    notificationSocket
  ]
});

export { store };
