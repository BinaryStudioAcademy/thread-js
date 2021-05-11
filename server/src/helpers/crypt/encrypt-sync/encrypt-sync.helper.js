import { hashSync } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '../../../common/constants/constants';

const encryptSync = data => hashSync(data, USER_PASSWORD_SALT_ROUNDS);

export { encryptSync };
