// import Sequelize from 'sequelize';
import Knex from 'knex';
import knexConfig from '../../../knexfile';

// const sequelize = new Sequelize(dbConfig);
const knex = Knex(knexConfig);

export { knex };
// export { sequelize };
