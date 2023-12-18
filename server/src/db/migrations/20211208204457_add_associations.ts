import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  POST_REACTIONS: 'post_reactions',
  IMAGES: 'images'
};

const ColumnName = {
  ID: 'id',
  IMAGE_ID: 'image_id',
  POST_ID: 'post_id',
  USER_ID: 'user_id'
};

const RelationRule = {
  CASCADE: 'CASCADE',
  SET_NULL: 'SET NULL'
};

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS, table => {
    table
      .integer(ColumnName.IMAGE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.IMAGES)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
  await knex.schema.alterTable(TableName.POSTS, table => {
    table
      .integer(ColumnName.IMAGE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.IMAGES)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
  await knex.schema.alterTable(TableName.POST_REACTIONS, table => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.POST_ID)
      .references(ColumnName.ID)
      .inTable(TableName.POSTS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
  await knex.schema.alterTable(TableName.COMMENTS, table => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.POST_ID)
      .references(ColumnName.ID)
      .inTable(TableName.POSTS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS, table => {
    table.dropColumn(ColumnName.IMAGE_ID);
  });
  await knex.schema.alterTable(TableName.POSTS, table => {
    table.dropColumn(ColumnName.IMAGE_ID);
    table.dropColumn(ColumnName.USER_ID);
  });
  await knex.schema.alterTable(TableName.POST_REACTIONS, table => {
    table.dropColumn(ColumnName.USER_ID);
    table.dropColumn(ColumnName.POST_ID);
  });
  await knex.schema.alterTable(TableName.COMMENTS, table => {
    table.dropColumn(ColumnName.USER_ID);
    table.dropColumn(ColumnName.POST_ID);
  });
}
