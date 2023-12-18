import { type store } from '~/libs/packages/store/store.js';

type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch };
