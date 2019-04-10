import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';
import userRepository from '../../data/repositories/user.repository';

export default {
    login: ({ id }) => tokenHelper.createToken({ id }),
    register: async ({ password, ...user }) => {
        const { id } = await userRepository.addUser({
            ...user,
            password: cryptoHelper.encrypt(password)
        });
        return tokenHelper.createToken({ id });
    }
};
