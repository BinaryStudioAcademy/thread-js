import { type Repository } from '~/libs/packages/database/database.js';

import { type Comment, type CommentWithUserNestedRelations } from './types.js';

type CommentRepository = Pick<Repository<Comment>, 'create'> & {
  getById(_id: number): Promise<CommentWithUserNestedRelations | null>;
};

export type { CommentRepository };
