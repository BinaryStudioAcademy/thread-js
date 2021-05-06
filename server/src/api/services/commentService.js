import { comment as commentRepository } from '../../data/repositories/repositories';

export const create = (userId, comment) => commentRepository.create({
  ...comment,
  userId
});

export const getCommentById = id => commentRepository.getCommentById(id);
