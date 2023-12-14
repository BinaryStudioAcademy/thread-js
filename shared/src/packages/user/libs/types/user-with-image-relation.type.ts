import { Image } from '~/packages/image/image.js';
import { User } from './user.type.js';

type UserWithImageRelation = User & {
  image: Image | null;
};

export { type UserWithImageRelation };
