import {
  AbstractModel,
  DatabaseTableName
} from '~/libs/packages/database/database.js';

class ImageModel extends AbstractModel {
  public link!: string;

  public static get tableName(): typeof DatabaseTableName.IMAGES {
    return DatabaseTableName.IMAGES;
  }
}

export { ImageModel };
