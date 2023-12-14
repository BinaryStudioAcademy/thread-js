import { type Knex } from 'knex';

import { commentsSeed } from '../seed-data/comments-seed.js';
import { postImagesSeed, postsSeed } from '../seed-data/posts-seed.js';
import { userImagesSeed, usersSeed } from '../seed-data/users-seed.js';

const TableName = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  POST_REACTIONS: 'post_reactions',
  IMAGES: 'images'
} as const;

const ColumnName = {
  IMAGE_ID: 'image_id',
  IS_LIKE: 'is_like',
  POST_ID: 'post_id',
  USER_ID: 'user_id'
} as const;

type SaveImageDto = {
  link: string;
};

type Image = SaveImageDto & {
  id: number;
};

type SaveUserDto = {
  email: string;
  username: string;
  password: string;
};

type User = SaveUserDto & {
  id: number;
};

type SavePostDto = {
  body: string;
  userId: number;
};

type Post = SavePostDto & {
  id: number;
};

const getRandomIndex = (length: number): number => {
  return Math.floor(Math.random() * length);
};

const mapLinks = (images: SaveImageDto[]): string[] => {
  return images.map(image => image.link);
};

export async function seed(knex: Knex): Promise<void> {
  try {
    await knex.transaction(async trx => {
      await trx(TableName.USERS).del();
      await trx(TableName.POSTS).del();
      await trx(TableName.COMMENTS).del();
      await trx(TableName.POST_REACTIONS).del();
      await trx(TableName.IMAGES).del();

      // Add images.
      await trx(TableName.IMAGES).insert([
        ...userImagesSeed,
        ...postImagesSeed
      ]);

      const userImages = await trx<Image>(TableName.IMAGES)
        .select('id')
        .whereIn('link', mapLinks(userImagesSeed));
      const postImages = await trx<Image>(TableName.IMAGES)
        .select('id')
        .whereIn('link', mapLinks(postImagesSeed));

      // Add users.
      const usersMappedSeed = usersSeed.map((user, index) => ({
        ...user,
        [ColumnName.IMAGE_ID]: userImages[index] ? userImages[index].id : null
      }));
      const users = await trx<User>(TableName.USERS)
        .insert(usersMappedSeed)
        .returning('*');

      // Add posts.
      const postsMappedSeed = postsSeed.map((post, index) => ({
        ...post,
        [ColumnName.USER_ID]: users[getRandomIndex(users.length)].id,
        [ColumnName.IMAGE_ID]: postImages[index] ? postImages[index].id : null
      }));
      const posts = await trx<Post>(TableName.POSTS)
        .insert(postsMappedSeed)
        .returning('*');

      // Add comments.
      const commentsMappedSeed = commentsSeed.map(comment => ({
        ...comment,
        [ColumnName.USER_ID]: users[getRandomIndex(users.length)].id,
        [ColumnName.POST_ID]: posts[getRandomIndex(posts.length)].id
      }));
      await trx(TableName.COMMENTS).insert(commentsMappedSeed);

      // Add post reactions.
      const postReactionsMappedSeed = users.map(user => ({
        [ColumnName.IS_LIKE]: true,
        [ColumnName.USER_ID]: user.id,
        [ColumnName.POST_ID]: posts[getRandomIndex(posts.length)].id
      }));
      await trx(TableName.POST_REACTIONS).insert(postReactionsMappedSeed);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Seeding error: ${error}`);
  }
}
