import { AbstractRepository } from '~/libs/packages/database/database.js';

import { type CommentModel } from './comment.model.js';
import {
  type Comment as TComment,
  type CommentRepository,
  type CommentWithUserNestedRelations
} from './libs/types/types.js';

type Constructor = Record<'commentModel', typeof CommentModel>;

class Comment
  extends AbstractRepository<typeof CommentModel, TComment>
  implements CommentRepository
{
  public constructor({ commentModel }: Constructor) {
    super(commentModel);
  }

  public async getById(
    id: number
  ): Promise<CommentWithUserNestedRelations | null> {
    const comment = await this.model
      .query()
      .findById(id)
      .withGraphFetched('[user.image]')
      .castTo<CommentWithUserNestedRelations>();

    return comment ?? null;
  }
}

export { Comment };
