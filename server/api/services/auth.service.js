import tokenService from '../../common/services/token.service';
import cryptoService from '../../common/services/crypto.service';
import userRepository from '../../data/repositories/user.repository';

export default {
    login: ({ id }) => tokenService.createToken({ id }),
    register: async ({ password, ...user }) => {
        const { id } = await userRepository.addUser({
            ...user,
            password: cryptoService.encrypt(password)
        });
        return tokenService.createToken({ id });
    }
};
