import { Model } from 'objection';

import BaseModel from '../base/base.model';
import PostModel from '../post/post.model';
import UserModel from '../user/user.model';

class Comment extends BaseModel {
  static get tableName() {
    return 'comments';
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema();

    return {
      type: baseSchema.type,
      required: baseSchema.required.concat(['body', 'userId', 'postId']),
      properties: {
        ...baseSchema.properties,
        body: { type: 'string' },
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
          from: 'comments.post_id',
          to: 'posts.id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        filter: query => query.select('id', 'username'),
        join: {
          from: 'comments.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default Comment;
