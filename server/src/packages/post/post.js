import { PostModel } from './post.model.js';
import { PostRepository } from './post.repository.js';
import { PostService } from './post.service.js';
import { PostReactionModel } from './post-reaction.model.js';
import { PostReactionRepository } from './post-reaction.repository.js';

const postRepository = new PostRepository({
  postModel: PostModel
});
const postReactionRepository = new PostReactionRepository({
  postReactionModel: PostReactionModel
});
const postService = new PostService({
  postRepository,
  postReactionRepository
});

export { postReactionRepository, postRepository, postService };
export { initPostApi } from './post.api.js';
export { PostModel } from './post.model.js';
export { PostReactionModel } from './post-reaction.model.js';
