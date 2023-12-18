import {
  type configureStore,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction
} from '@reduxjs/toolkit';

import { type notificationApi } from '~/libs/packages/notification/notification.js';
import { type authApi } from '~/packages/auth/auth.js';
import { type commentApi } from '~/packages/comment/comment.js';
import { type imageApi } from '~/packages/image/image.js';
import { type postApi } from '~/packages/post/post.js';
import { type storageApi } from '~/packages/storage/storage.js';
import { type reducer as profileReducer } from '~/slices/profile/profile.js';
import { type reducer as threadReducer } from '~/slices/thread/thread.js';

type RootReducer = {
  profile: ReturnType<typeof profileReducer>;
  posts: ReturnType<typeof threadReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  commentApi: typeof commentApi;
  imageApi: typeof imageApi;
  notificationApi: typeof notificationApi;
  postApi: typeof postApi;
  storageApi: typeof storageApi;
};

type StoreInstance = ReturnType<
  typeof configureStore<
    RootReducer,
    UnknownAction,
    Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
  >
>;

type StorePackage = {
  extraArguments: ExtraArguments;
};

export { type ExtraArguments, type StoreInstance, type StorePackage };
