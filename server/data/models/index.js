const orm = require('../db/connection');
const sequelize = require('sequelize');

const UserModel = require('./user')(orm, sequelize);
const PostModel = require('./post')(orm, sequelize);
const PostReactionModel = require('./post-reaction')(orm, sequelize);
const CommentModel = require('./comment')(orm, sequelize);
const ImageModel = require('./image')(orm, sequelize);

module.exports = {
    UserModel,
    PostModel,
    PostReactionModel,
    CommentModel,
    ImageModel
};
