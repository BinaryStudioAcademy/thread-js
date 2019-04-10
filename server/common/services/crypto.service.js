import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
    encrypt: data => bcrypt.hash(data, saltRounds),
    encryptSync: data => bcrypt.hash(data, saltRounds),
    compare: (data, encrypted) => bcrypt.compare(data, encrypted)
};
