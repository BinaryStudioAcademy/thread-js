import {
  type Comment,
  type CreateCommentRequestDto,
  type GetCommentByIdResponseDto
} from './types.js';

type CommentService = {
  create(_userId: number, _comment: CreateCommentRequestDto): Promise<Comment>;
  getById(_id: number): Promise<GetCommentByIdResponseDto>;
};

export { type CommentService };
