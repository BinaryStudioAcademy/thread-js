import {
  type CreatePostReactionRequestDto,
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type GetPostByIdResponseDto,
  type GetPostsByFilterRequestDto,
  type GetPostsByFilterResponseDto,
  type Post
} from './types.js';

type PostService = {
  getByFilter(
    _filter: GetPostsByFilterRequestDto
  ): Promise<GetPostsByFilterResponseDto>;
  getById(_id: number): Promise<GetPostByIdResponseDto | null>;
  create(_userId: number, _post: CreatePostRequestDto): Promise<Post>;
  setReaction(
    _userId: number,
    _postReaction: CreatePostReactionRequestDto
  ): Promise<CreatePostReactionResponseDto>;
};

export { type PostService };
