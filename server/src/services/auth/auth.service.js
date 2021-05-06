import { createToken } from '../../helpers/tokenHelper';
import { encrypt } from '../../helpers/cryptoHelper';
import { user as userRepository } from '../../data/repositories/repositories';

export const login = async ({ id }) => ({
  token: createToken({ id }),
  user: await userRepository.getUserById(id)
});

export const register = async ({ password, ...userData }) => {
  const newUser = await userRepository.addUser({
    ...userData,
    password: await encrypt(password)
  });
  return login(newUser);
};
