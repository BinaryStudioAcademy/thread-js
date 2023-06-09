import { configureStore } from '@reduxjs/toolkit';
import { auth } from 'packages/auth/auth';
import { comment } from 'packages/comment/comment';
import { http } from 'packages/http/http';
import { image } from 'packages/image/image';
import { notification } from 'packages/notification/notification';
import { post } from 'packages/post/post';
import { storage } from 'packages/storage/storage';
import { reducer as profileReducer } from 'slices/profile/profile';
import { reducer as threadReducer } from 'slices/thread/thread';

import { notificationSocket } from './middlewares/middlewares';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: threadReducer
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({
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
  }), notificationSocket]
});

export { store };
