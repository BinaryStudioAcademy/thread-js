import { AbstractRepository } from '~/libs/packages/database/database.js';

import {
  type PostReaction as TPostReaction,
  type PostReactionRepository,
  type PostReactionWithPostRelation
} from './libs/types/types.js';
import { type PostReactionModel } from './post-reaction.model.js';

type Constructor = Record<'postReactionModel', typeof PostReactionModel>;

class PostReaction
  extends AbstractRepository<typeof PostReactionModel, TPostReaction>
  implements PostReactionRepository
{
  public constructor({ postReactionModel }: Constructor) {
    super(postReactionModel);
  }

  public async getByUserIdPostId(
    userId: number,
    postId: number
  ): Promise<PostReactionWithPostRelation | null> {
    const postReaction = await this.model
      .query()
      .select()
      .findOne({ userId, postId })
      .withGraphFetched('[post]')
      .castTo<PostReactionWithPostRelation>();

    return postReaction ?? null;
  }
}

export { PostReaction };
