import { CommentModel } from './comment.model.js';
import { CommentRepository } from './comment.repository.js';
import { CommentService } from './comment.service.js';

const commentRepository = new CommentRepository({
  commentModel: CommentModel
});
const commentService = new CommentService({
  commentRepository
});

export { CommentModel, commentRepository, commentService };
export { initCommentApi } from './comment.api.js';
