import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
    encrypt: data => bcrypt.hash(data, saltRounds),
    encryptSync: data => bcrypt.hashSync(data, saltRounds),
    compare: (data, encrypted) => bcrypt.compare(data, encrypted)
};
