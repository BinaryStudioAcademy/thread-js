import commentRepository from '../../data/repositories/commentRepository';

export const create = (userId, comment) => commentRepository.create({
  ...comment,
  userId
});

export const getCommentById = id => commentRepository.getCommentById(id);
