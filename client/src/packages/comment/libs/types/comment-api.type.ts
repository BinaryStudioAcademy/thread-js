import {
  type Comment,
  type CreateCommentRequestDto,
  type GetCommentByIdResponseDto
} from './types.js';

type CommentApi = {
  getComment(id: number): Promise<GetCommentByIdResponseDto>;

  addComment(payload: CreateCommentRequestDto): Promise<Comment>;
};

export { type CommentApi };
