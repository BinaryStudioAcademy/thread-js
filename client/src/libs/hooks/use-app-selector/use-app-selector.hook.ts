import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import { type store } from '~/libs/packages/store/store.js';

const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.instance.getState>
> = useSelector;

export { useAppSelector };
