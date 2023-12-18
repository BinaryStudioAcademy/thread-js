import { type Knex } from 'knex';

const TableName = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  POST_REACTIONS: 'post_reactions',
  IMAGES: 'images'
} as const;

const ColumnName = {
  BODY: 'body',
  CREATED_AT: 'created_at',
  EMAIL: 'email',
  ID: 'id',
  IS_LIKE: 'is_like',
  LINK: 'link',
  PASSWORD: 'password',
  UPDATED_AT: 'updated_at',
  USERNAME: 'username'
} as const;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TableName.USERS, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.EMAIL).notNullable().unique();
    table.string(ColumnName.USERNAME).notNullable().unique();
    table.string(ColumnName.PASSWORD).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.POSTS, table => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.BODY).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.COMMENTS, table => {
    table.increments(ColumnName.ID).primary();
    table.text(ColumnName.BODY).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.POST_REACTIONS, table => {
    table.increments(ColumnName.ID).primary();
    table.boolean(ColumnName.IS_LIKE).notNullable().defaultTo(true);
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(TableName.IMAGES, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.LINK).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.USERS);
  await knex.schema.dropTableIfExists(TableName.POSTS);
  await knex.schema.dropTableIfExists(TableName.COMMENTS);
  await knex.schema.dropTableIfExists(TableName.POST_REACTIONS);
  await knex.schema.dropTableIfExists(TableName.IMAGES);
}
