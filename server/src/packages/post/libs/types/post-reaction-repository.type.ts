import { type Repository } from '~/libs/packages/database/database.js';

import {
  type PostReaction,
  type PostReactionWithPostRelation
} from './types.js';

type PostReactionRepository = Pick<
  Repository<PostReaction>,
  'create' | 'updateById' | 'deleteById'
> & {
  getByUserIdPostId(
    _userId: number,
    _postId: number
  ): Promise<PostReactionWithPostRelation | null>;
};

export { type PostReactionRepository };
