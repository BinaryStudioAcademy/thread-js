import { type Image } from '~/packages/image/image.js';

import { type User } from './user.type.js';

type UserWithImageRelation = User & {
  image: Image | null;
};

export { type UserWithImageRelation };
