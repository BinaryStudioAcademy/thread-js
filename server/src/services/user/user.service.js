import { user as userRepository } from '../../data/repositories/repositories';

export const getUserById = async userId => {
  const {
    id,
    username,
    email,
    imageId,
    image
  } = await userRepository.getUserById(userId);

  return { id, username, email, imageId, image };
};
