/* eslint-disable unicorn/prefer-spread */
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ConfigPackage } from '~/libs/packages/config/config.js';
import { notificationApi } from '~/libs/packages/notification/notification.js';
import { authApi } from '~/packages/auth/auth.js';
import { commentApi } from '~/packages/comment/comment.js';
import { imageApi } from '~/packages/image/image.js';
import { postApi } from '~/packages/post/post.js';
import { storageApi } from '~/packages/storage/storage.js';
import { reducer as profileReducer } from '~/slices/profile/profile.js';
import { reducer as threadReducer } from '~/slices/thread/thread.js';

import {
  type ExtraArguments,
  type StoreInstance,
  type StorePackage
} from './libs/types/types.js';
import { notificationSocket } from './middlewares/middlewares.js';

class Store implements StorePackage {
  #instance: StoreInstance;

  public get instance(): StoreInstance {
    return this.#instance;
  }

  public constructor(config: ConfigPackage) {
    this.#instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        profile: profileReducer,
        posts: threadReducer
      },
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments
          }
        }).concat(notificationSocket);
      }
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      commentApi,
      imageApi,
      notificationApi,
      postApi,
      storageApi
    };
  }
}

export { Store };
