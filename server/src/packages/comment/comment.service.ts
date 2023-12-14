import {
  type Comment as TComment,
  type CommentRepository,
  type CommentService,
  type CreateCommentRequestDto,
  type GetCommentByIdResponseDto
} from './libs/types/types.js';

type Constructor = {
  commentRepository: CommentRepository;
};

class Comment implements CommentService {
  #commentRepository: CommentRepository;

  public constructor({ commentRepository }: Constructor) {
    this.#commentRepository = commentRepository;
  }

  public create(
    userId: number,
    comment: CreateCommentRequestDto
  ): Promise<TComment> {
    return this.#commentRepository.create({
      ...comment,
      userId
    });
  }

  public getById(id: number): Promise<GetCommentByIdResponseDto> {
    return this.#commentRepository.getById(id);
  }
}

export { Comment };
