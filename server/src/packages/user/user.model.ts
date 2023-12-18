import {
  Model,
  type Modifiers,
  type QueryBuilder,
  type RelationMappings
} from 'objection';

import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/packages/database/database.js';
import { ImageModel } from '~/packages/image/image.js';

class User extends AbstractModel {
  public email!: string;

  public username!: string;

  public password!: string;

  public imageId!: number | null;

  public static get tableName(): typeof DatabaseTableName.USERS {
    return DatabaseTableName.USERS;
  }

  public static override get modifiers(): Modifiers<QueryBuilder<User>> {
    return {
      withoutPassword(builder): QueryBuilder<User> {
        return builder.select(
          'id',
          'email',
          'username',
          'imageId',
          'createdAt',
          'updatedAt'
        );
      }
    };
  }

  public static get relationMappings(): RelationMappings {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        filter: (query: QueryBuilder<ImageModel>): QueryBuilder<ImageModel> => {
          return query.select('id', 'link');
        },
        join: {
          from: `${DatabaseTableName.USERS}.imageId`,
          to: `${DatabaseTableName.IMAGES}.id`
        }
      }
    };
  }
}

export { User };
