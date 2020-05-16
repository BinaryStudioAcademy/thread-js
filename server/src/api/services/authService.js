import tokenHelper from '../../helpers/tokenHelper';
import cryptoHelper from '../../helpers/cryptoHelper';
import userRepository from '../../data/repositories/userRepository';

export const login = async ({ id }) => ({
  token: tokenHelper.createToken({ id }),
  user: await userRepository.getUserById(id)
});

export const register = async ({ password, ...userData }) => {
  const newUser = await userRepository.addUser({
    ...userData,
    password: await cryptoHelper.encrypt(password)
  });
  return login(newUser);
};
