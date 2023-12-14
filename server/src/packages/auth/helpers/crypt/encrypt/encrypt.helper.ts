import { hash } from 'bcrypt';

import { USER_PASSWORD_SALT_ROUNDS } from '../libs/constants/constants.js';

const encrypt = (data: string): Promise<string> => {
  return hash(data, USER_PASSWORD_SALT_ROUNDS);
};

export { encrypt };
