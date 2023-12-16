import { type User } from './user.type.js';

type UserWithPassword = User & Record<'password', string>;

export { type UserWithPassword };
