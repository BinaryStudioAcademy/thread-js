class CommentService {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  create(userId, comment) {
    return this._commentRepository.create({
      ...comment,
      userId
    });
  }

  getById(id) {
    return this._commentRepository.getCommentById(id);
  }
}

export { CommentService };
