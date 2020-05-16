import Sequelize from 'sequelize';
import * as config from '../../config/dbConfig';

export default new Sequelize(config);
