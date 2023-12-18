import { ApiPath } from '~/libs/enums/enums.js';

import { Comment as CommentController } from './comment.controller.js';
import { CommentModel } from './comment.model.js';
import { Comment as CommentRepository } from './comment.repository.js';
import { Comment as CommentService } from './comment.service.js';

const commentRepository = new CommentRepository({
  commentModel: CommentModel
});
const commentService = new CommentService({
  commentRepository
});
const commentController = new CommentController({
  apiPath: ApiPath.COMMENTS,
  commentService
});

export { commentController, commentRepository, commentService };
export { CommentModel } from './comment.model.js';
export { CommentPayloadKey, CommentsApiPath } from './libs/enums/enums.js';
export {
  type Comment,
  type CommentRepository,
  type CommentService
} from './libs/types/types.js';
