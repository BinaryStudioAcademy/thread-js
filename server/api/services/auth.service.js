import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';
import userRepository from '../../data/repositories/user.repository';

export const login = async ({ id, username, email }) => ({
    token: tokenHelper.createToken({ id }),
    user: { id, username, email }
});

export const register = async ({ password, ...userData }) => {
    const newUser = await userRepository.addUser({
        ...userData,
        password: await cryptoHelper.encrypt(password)
    });
    return login(newUser);
};
