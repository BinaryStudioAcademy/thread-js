import bcrypt from 'bcrypt';

const saltRounds = 10;

export const encrypt = data => bcrypt.hash(data, saltRounds);

export const encryptSync = data => bcrypt.hashSync(data, saltRounds);

export const compare = (data, encrypted) => bcrypt.compare(data, encrypted);
