import { type Repository } from '~/libs/packages/database/database.js';

import {
  type Post,
  type PostFilter,
  type PostWithCommentImageUserNestedRelationsWithCount,
  type PostWithImageUserNestedRelationsWithCount
} from './types.js';

type PostRepository = Pick<
  Repository<Post | PostWithCommentImageUserNestedRelationsWithCount>,
  'create'
> & {
  getByFilter(
    _filters: PostFilter
  ): Promise<PostWithImageUserNestedRelationsWithCount[]>;
  getById(
    _id: number
  ): Promise<PostWithCommentImageUserNestedRelationsWithCount | null>;
};

export { type PostRepository };
