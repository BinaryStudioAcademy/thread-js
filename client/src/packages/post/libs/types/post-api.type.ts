import {
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type GetPostByIdResponseDto,
  type GetPostsByFilterRequestDto,
  type GetPostsByFilterResponseDto,
  type Post
} from './types.js';

type PostApi = {
  getByFilter(
    filter: GetPostsByFilterRequestDto
  ): Promise<GetPostsByFilterResponseDto>;

  getById(id: number): Promise<GetPostByIdResponseDto>;

  create(payload: CreatePostRequestDto): Promise<Post>;

  likePost(postId: number): Promise<CreatePostReactionResponseDto>;
};

export { type PostApi };
