import { compare } from 'bcrypt';

const cryptCompare = (data, encrypted) => compare(data, encrypted);

export { cryptCompare };
