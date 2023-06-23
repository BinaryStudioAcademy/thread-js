import { ApiPath } from '#libs/enums/enums.js';

import { CommentController } from './comment.controller.js';
import { CommentModel } from './comment.model.js';
import { CommentRepository } from './comment.repository.js';
import { CommentService } from './comment.service.js';

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
