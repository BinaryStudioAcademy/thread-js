import { Model } from 'objection';

import BaseModel from '../base/base.model';
import PostModel from '../post/post.model';
import UserModel from '../user/user.model';

class PostReaction extends BaseModel {
  static get tableName() {
    return 'post_reactions';
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema();

    return {
      type: baseSchema.type,
      required: baseSchema.required.concat(['isLike', 'userId', 'postId']),
      filter: query => query.select('id', 'userId'),
      properties: {
        ...baseSchema.properties,
        isLike: { type: 'boolean' },
        postId: { type: ['integer', 'null'] },
        userId: { type: ['integer', 'null'] }
      }
    };
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: 'post_reactions.post_id',
          to: 'posts.id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: 'post_reactions.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default PostReaction;
